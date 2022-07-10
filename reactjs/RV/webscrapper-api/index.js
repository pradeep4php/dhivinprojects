var webdriver = require('selenium-webdriver');
const { Browser, By, Key, until } = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var builder = new webdriver.Builder().forBrowser('chrome');
var driver = builder.build();
driver.get('https://help.zoho.com/portal/en/kb/desk/for-administrators/multi-channel-support/email/articles/setting-up-your-email-channel#Adding_Support_Email_Alias').then(async () => {
    const pageSource = await driver.findElement(By.tagName("body")).getText();

    const re = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
    const myArray = pageSource.match(re);
    var links = await driver.findElements(By.tagName("a"));
    for (link of links) {
       console.log(await link.getText() + " - " + await link.getAttribute("href"));
       
    }
    //callback(null, 'Page title for ' + event.url + ' is ' + title);
 });