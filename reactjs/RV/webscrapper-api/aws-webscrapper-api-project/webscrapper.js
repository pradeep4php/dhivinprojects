

var webdriver = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
let serviceBuilder = new chrome.ServiceBuilder('/opt/chromedriver/89.0.4389.23/chromedriver');

var builder = new webdriver.Builder().forBrowser('chrome').setChromeService(serviceBuilder);


class Webscrapper {

    constructor() {
        this.maxDepth = 1;
        //this.driver = null;
        this.visitedLinks = [];
        this.emailAddressList = [];
        this.emailExpression = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
        this.currentDomain = '';
        var chromeOptions = new chrome.Options();
        const defaultChromeFlags = [
            '--headless',
            '--disable-gpu',
            '--disable-dev-tools', 
            '--no-sandbox',
            '--user-data-dir=/tmp/chrome-user-data',
            '--no-zygote',
            '--enable-logging',
            '--log-level=0',
            '--single-process',
            '--disable-dev-shm-usage',
            '--data-path=/tmp/data-path',
            '--ignore-certificate-errors',
            '--homedir=/tmp',
            '--remote-debugging-port=9222'
        ];

        chromeOptions.setChromeBinaryPath('/opt/chrome/843831/chrome');
        chromeOptions.addArguments(defaultChromeFlags);

        builder.setChromeOptions(chromeOptions);
        

    }

    async getEmailList(webUrl) {
        try {

            var domainurl = new URL(webUrl);
            this.currentDomain = domainurl.host;

            await this.CrawlWeb(webUrl.toLowerCase(), 0);
            //this.driver.close();
            return this.emailAddressList;
        }
        catch (exc) {
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
        if (url.host != this.currentDomain)
            return false;

        return url.protocol === "http:" || url.protocol === "https:";
    }

    async CrawlWeb(webUrl, depth) {
        console.log(`Crawling url ${webUrl}`)
        if (this.visitedLinks.includes(webUrl) == true)
            return;
        this.visitedLinks.push(webUrl);
        var driver = builder.build();
        var result = await driver.get(webUrl);
        const pageSource = await driver.findElement(By.tagName("body")).getText();
        var mails = pageSource.match(this.emailExpression);
        if (mails != null) {
            for (var mail of mails) {
                if (this.emailAddressList.includes(mail) == false)
                    this.emailAddressList.push(mail);
            }
        }
        var links = await driver.findElements(By.tagName("a"));
        var pageLinks = [];
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
        driver.close();
        //return;
        for(var pageLink of pageLinks)
        {
            await this.CrawlWeb(pageLink, depth + 1);
        }
        return;
    }
}

module.exports = { Webscrapper }