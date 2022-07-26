const { DraftEmail,service_request } = require('./models');
const { Consumer } = require('sqs-consumer');
const { Webscrapper } = require("./webscrapper");
const AWS = require('aws-sdk');
const https = require('https');
AWS.config.update({ region: 'REGION' });
const app = Consumer.create({
    queueUrl: 'https://sqs.us-east-2.amazonaws.com/862836902890/scrapperjobqueue/',
    handleMessage: async (message) => {
        // do some work with `message`
        console.log(message);
        process(message);
    },
    sqs: new AWS.SQS({
        httpOptions: {
            agent: new https.Agent({
                keepAlive: true
            })
        }
    })
});

app.on('error', (err) => {
    console.error(err.message);
});

app.on('processing_error', (err) => {
    console.error(err.message);
});

app.start();

async function process(record) {
    console.log("Message Body: ", record.body);
    payload = JSON.parse(record.Body);

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
    var emaillist = await scrapper.getEmailList(payload.url, srid);
    console.log(emaillist)
    var emailListDB = [];
    for (emailid of emaillist) {
        if (emailid != '' && emailid != null) {
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
