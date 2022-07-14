const { DraftEmail } = require('./models');
const { service_request } = require('./models');
const { Webscrapper } = require("./webscrapper");
const consumer = async (event) => {
    var payload;
    for (const record of event.Records) {
        console.log("Message Body: ", record.body);
        payload = JSON.parse(record.body);

        console.log("IN Queue " + payload.id + " " + payload.url);
        const id = payload.id;
        srid = id;
        const url = payload.url;
        initialurl = url;
        var domainurl = new URL(initialurl);
        domain = domainurl.host;

        const servicerequest = await service_request.findOne({
            where: { id }
        });

        //Progress updated
        servicerequest.status = 'progress';
        await servicerequest.save();

        //WebScrapping Call
        var scrapper = new Webscrapper();
        var emaillist = await scrapper.getEmailList(url);
        var emailListDB = [];
        for (emailid of emaillist) {
            const email = {
                servicerequestid: id,
                emailaddress: emailid
            }
            emailListDB.push(email);
            //DraftEmail.create(email);
        }
        console.log("Mail List to Push in draft " + emailListDB);
        DraftEmail.bulkCreate(emailListDB);

        //Complete updated
        servicerequest.status = 'complete';
        await servicerequest.save();
    }
};

module.exports = {
    consumer,
};
