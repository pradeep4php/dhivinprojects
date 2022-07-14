

var webdriver = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var builder = new webdriver.Builder().forBrowser('chrome');


class Webscrapper {

    constructor() {
        this.maxDepth = 2;
        this.driver = null;
        this.visitedLinks = [];
        this.emailAddressList = [];
        this.emailExpression = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi

        var chromeOptions = new chrome.Options();
        const defaultChromeFlags = [
            '--headless',
            '--disable-gpu',
            '--window-size=1280x1696', // Letter size
            '--no-sandbox',
            '--user-data-dir=/tmp/user-data',
            '--hide-scrollbars',
            '--enable-logging',
            '--log-level=0',
            '--v=99',
            
            '--data-path=/tmp/data-path',
            '--ignore-certificate-errors',
            '--homedir=/tmp',
            '--disk-cache-dir=/tmp/cache-dir'
        ];

        //chromeOptions.setChromeBinaryPath("/var/task/lib/chrome");
        chromeOptions.addArguments(defaultChromeFlags);

        builder.setChromeOptions(chromeOptions);
    }

    async getEmailList(webUrl) {
        try {
            await this.CrawlWeb(webUrl.toLowerCase(), 0);
            this.driver.close();
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

        return url.protocol === "http:" || url.protocol === "https:";
    }

    async CrawlWeb(webUrl, depth) {
        console.log(`Crawling url ${webUrl}`)
        if (this.visitedLinks.includes(webUrl) == true)
            return;
        this.visitedLinks.push(webUrl);
        this.driver = builder.build();
        var result = await this.driver.get(webUrl);
        const pageSource = await this.driver.findElement(By.tagName("body")).getText();
        var mails = pageSource.match(this.emailExpression);
        if (mails != null) {
            for (var mail of mails) {
                if (this.emailAddressList.includes(mail) == false)
                    this.emailAddressList.push(mail);
            }
        }
        var links = await this.driver.findElements(By.tagName("a"));

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
                await this.CrawlWeb(href.toLowerCase(), depth + 1);
            }
        }

        return;
    }
}

module.exports = { Webscrapper }