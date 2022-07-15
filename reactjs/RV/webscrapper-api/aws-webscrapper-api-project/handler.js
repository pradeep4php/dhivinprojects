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
        message: {
          "ServiceRequestID": id
        }
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
        message: {
          "ServiceRequestID" : id,
          "ServiceRequestID Status" : currentstatus
        }
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
        message: {
          "ServiceRequestID" : id,
          "Email IDs" : draftEmailList
        }
      },
      null,
      2
    ),
  };
};
