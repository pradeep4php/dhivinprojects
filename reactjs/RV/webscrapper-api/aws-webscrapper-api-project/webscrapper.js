

var webdriver = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
let serviceBuilder = new chrome.ServiceBuilder('/var/task/lib/chromedriver');

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
            '--window-size=1280x1696', // Letter size
            '--no-sandbox',
            '--user-data-dir=/tmp/user-data',
            '--hide-scrollbars',
            '--enable-logging',
            '--log-level=0',
            '--v=99',
            '--disable-dev-shm-usage',
            '--data-path=/tmp/data-path',
            '--ignore-certificate-errors',
            '--homedir=/tmp',
            '--disk-cache-dir=/tmp/cache-dir'
        ];

        chromeOptions.addArguments("start-maximized"); // open Browser in maximized mode
        chromeOptions.addArguments("disable-infobars"); // disabling infobars
        chromeOptions.addArguments("--disable-extensions"); // disabling extensions
        chromeOptions.addArguments("--disable-gpu"); // applicable to windows os only
        chromeOptions.addArguments("--disable-dev-shm-usage"); // overcome limited resource problems
        chromeOptions.addArguments("--no-sandbox"); // Bypass OS security model
        chromeOptions.addArguments("--remote-debugging-port=0");

        chromeOptions.setChromeBinaryPath("/var/task/lib");
        //chromeOptions.addArguments(defaultChromeFlags);

        //builder.setChromeOptions(chromeOptions);
        

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
        try {
            console.log(`Crawling url ${webUrl}`)
            
            var driver = builder.build();
            var d = await driver.get("http://google.com")
            const pageSource = await driver.findElement(By.tagName("body")).getText();
            console.log(pageSource);

            driver.close();
        }
        catch(exc)
        {
            console.log(exc.message);
        }
        
        return;
    }
}

module.exports = { Webscrapper }