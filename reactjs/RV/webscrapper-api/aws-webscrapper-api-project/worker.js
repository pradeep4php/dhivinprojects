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
       

        const servicerequest = await service_request.findOne({
            where: { id }
        });

        //Progress updated
        servicerequest.status = 'progress';
        await servicerequest.save();

        //WebScrapping Call
        var scrapper = new Webscrapper();
        var emaillist = await scrapper.getEmailList(payload.url);
        console.log(emaillist)
        var emailListDB = [];
        for (emailid of emaillist) {
            if(emailid!='' && emailid!=null){
                /*emailListDB.push(JSON.stringify({
                servicerequestid: srid,
                emailaddress: emailid
                }))*/
                //emailListDB.push(`{servicerequestid:${srid},emailaddress:${emailid}}`)
                DraftEmail.create({
                    servicerequestid: srid,
                    emailaddress: emailid
                });
            }
            
            //console.log(email);
            //emailListDB.push(JSON.stringify(email));
            //DraftEmail.create(email);
        }
        //console.log("Mail List to Push in draft " + emailListDB);
        //await DraftEmail.bulkCreate(emailListDB);

        //Complete updated
        servicerequest.status = 'complete';
        await servicerequest.save();
    }
};

module.exports = {
    consumer,
};
