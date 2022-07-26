

var webdriver = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
let serviceBuilder = new chrome.ServiceBuilder('/opt/chromedriver/100.0.4896.20/chromedriver');

var builder = new webdriver.Builder().forBrowser('chrome').setChromeService(serviceBuilder);
const { createLogStream , Logger } = require('aws-cloudwatch-log');

const AWS = require('aws-sdk');
require('dotenv').config()





class Webscrapper {

    constructor() {
        this.maxDepth = 1;
        //this.driver = null;
        this.visitedLinks = [];
        this.emailAddressList = [];
        this.emailExpression = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
        this.currentDomain = '';
        this.logStreamName = "";
        this.logger = null;
        var chromeOptions = new chrome.Options();
        const defaultChromeFlags = [
            '--headless',
            '--disable-gpu',
            '--disable-dev-tools',
            '--no-sandbox',
            '--disable-dev-shm-usage',

        ];

        chromeOptions.addArguments('--headless')
        chromeOptions.addArguments("--no-sandbox")
        chromeOptions.addArguments("--disable-dev-shm-usage")
        chromeOptions.addArguments("--disable-gpu")
        chromeOptions.addArguments("--disable-dev-tools")
        chromeOptions.addArguments("--no-zygote")
        chromeOptions.addArguments("--single-process")
        //chromeOptions.addArguments("window-size=2560x1440")
        //chromeOptions.addArguments("--user-data-dir=/tmp/chrome-user-data")
        //chromeOptions.addArguments("--remote-debugging-port=9222")

        chromeOptions.setChromeBinaryPath('/opt/chrome/972765/chrome');
        chromeOptions.setChromeLogFile('/var/log');
        //chromeOptions.addArguments(defaultChromeFlags);

        builder.setChromeOptions(chromeOptions);


    }

    async getEmailList(webUrl, serviceID) {
        try {

           
            const config = { 
                logGroupName: 'RvPixie', 
                local: false, 		// Optional. If set to true, no LogStream will be created.
                accessKeyId: process.env.aws_access_key_id,
                secretAccessKey: process.env.aws_secret_access_key,
                region: process.env.region

            }
            this.logStreamName =  `ServiceID${serviceID}`
            await createLogStream(this.logStreamName, config);
            
            config.logStreamName = this.logStreamName;
            this.logger = new Logger(config)


            var domainurl = new URL(webUrl);
            this.currentDomain = domainurl.host;

            await this.CrawlWeb(webUrl.toLowerCase(), 0);
            //this.driver.close();
            return this.emailAddressList;
        }
        catch (exc) {
            this.logger.log({ category: 'critical', details: `Exception while parsing the url ${webUrl} with exception ${exc.message}` })
            console.error(exc.message, exc);
            return this.emailAddressList;

        }

    }

    IsValidHttpUrl(string) {
        let url;

        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        if (url.host.includes(this.currentDomain))
            return true;
        return false;
        //return url.protocol === "http:" || url.protocol === "https:";
    }

    async CrawlWeb(webUrl, depth) {
        try {
            var pageLinks = [];
            var driver = builder.build();
            try {
                console.log(`Crawling url ${webUrl}`)
                this.logger.log({ category: 'info', details: `Crawling url ${webUrl}` });
                if (this.visitedLinks.includes(webUrl) == true)
                    return;
                this.visitedLinks.push(webUrl);

                var result = await driver.get(webUrl);
                const pageSource = await driver.findElement(By.tagName("body"))?.getText();
                if (pageSource == null || pageSource == '')
                    return;
                var mails = pageSource.match(this.emailExpression);
                if (mails != null) {
                    for (var mail of mails) {
                        if (this.emailAddressList.includes(mail) == false)
                            this.emailAddressList.push(mail);
                    }
                    console.log(`List of emails from this page ${webUrl} is ${mails}`)
                }

                var links = await driver.findElements(By.tagName("a"));
                if (links == null)
                    return;
                pageLinks = [];
                for (var link of links) {

                    var href = await link.getAttribute("href");
                    if (href == null || href == '')
                        continue;
                    if (href.includes("mailto") == true) {
                        const mailCheck = href.split("mailto:");
                        if (this.emailAddressList.includes(mailCheck[0]) == false) {
                            this.emailAddressList.push(mailCheck[0]);
                        }
                    }
                    else if (this.visitedLinks.includes(href) == false && depth < this.maxDepth && this.IsValidHttpUrl(href)) {
                        pageLinks.push(href.toLowerCase());
                        //await this.CrawlWeb(href.toLowerCase(), depth + 1);
                    }
                }
            }
            catch (exc) {
                console.log(`Exception while crawling ${webUrl} with ${exc.message}`);
                this.logger.log({ category: 'critical', details: `Exception while crawling ${webUrl} with ${exc.message}` })
            }

            console.log(`Completed crawling url ${webUrl}`)
            this.logger.log({ category: 'info', details: `Completed crawling url ${webUrl}` });
            driver.close();
            driver.quit();
            //return;
            for (var pageLink of pageLinks) {
                await this.CrawlWeb(pageLink, depth + 1);
            }
        }
        catch (exc) {
            console.log(`Outer Exception while crawling ${webUrl} with ${exc.message}`);
            this.logger.log({ category: 'critical', details: `Outer Exception while crawling ${webUrl} with ${exc.message}` })
        }

        return;
    }
}

module.exports = { Webscrapper }