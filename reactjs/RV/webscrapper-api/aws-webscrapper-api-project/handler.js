"use strict";
const request = require("./servicerequest");
const { SQS } = require("aws-sdk");

const sqs = new SQS();

module.exports.scrapper = async (event) => {
  const reqid=JSON.parse(event.body);
  const url=reqid.url;
  console.log(url);
  const id = await request.webScrapper(url);
  const serviceRequest = {
    "id" : id,
    "url" : url
  }
  //console.log(serviceRequest)
  //Send SQS
  try {
    await sqs
      .sendMessage({
        QueueUrl: 'https://sqs.us-east-2.amazonaws.com/862836902890/scrapperjobqueue/',
        MessageBody: JSON.stringify(serviceRequest)
      })
      .promise();
  } catch (error) {
    console.log(error);
  }
  //console.log(id);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        
          "serviceRequestID": id
        
      },
      null,
      2
    ),
  };
};
module.exports.status = async (event) => {
  const id=event.pathParameters.id;
  console.log(id);
  const currentstatus = await request.getCurrentStatus(id);
  console.log(currentstatus);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
       
          "serviceRequestID" : id,
          "status" : currentstatus
        
      },
      null,
      2
    ),
  };
};

module.exports.draftemail = async (event) => {
  const id=event.pathParameters.id;
  console.log(id);
  const draftEmailList = await request.getDraftEmail(id);
  console.log(draftEmailList)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        
          "serviceRequestID" : id,
          "emaillist" : draftEmailList
        
      },
      null,
      2
    ),
  };
};


module.exports.campground = async (event) => {
  const name=event.pathParameters.name;
  console.log(name);
  const campGrounds = await request.getCampGroundDetails(name);
  console.log(campGrounds)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "campGrounds" : campGrounds
      },
      null,
      2
    ),
  };
};

module.exports.addemails = async (event) => {
  const emailsToAdd=JSON.parse(event.body);
  console.log(emailsToAdd);
  const addedEmailIDs = await request.insertEmails(emailsToAdd);
  console.log(addedEmailIDs)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "emailsAdded" : addedEmailIDs
      },
      null,
      2
    ),
  };
};

module.exports.getemails = async (event) => {
  const emailID=event.pathParameters.id;
  console.log(emailID);
  const EmailIDs = await request.getEmails(emailID);
  console.log(emailID)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
          "emailList" : EmailIDs
      },
      null,
      2
    ),
  };
};

module.exports.deleteemail = async (event) => {
  const campID=event.pathParameters.campid;
  const emailAddress=event.pathParameters.email;
  console.log(`${campID} ${emailAddress}`);
  const deletedMail = await request.deleteEmail(campID,emailAddress);
  console.log(deletedMail)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
          "deletedEmailCount" : deletedMail
      },
      null,
      2
    ),
  };
};

module.exports.existingEmail = async (event) => {
  const serviceRequestID=event.pathParameters.id;
  //console.log(`${campID} ${emailAddress}`);
  const existingEmailID = await request.existingEmail(serviceRequestID);
  console.log(existingEmailID)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
          "existingEmail" : existingEmailID
      },
      null,
      2
    ),
  };
};

