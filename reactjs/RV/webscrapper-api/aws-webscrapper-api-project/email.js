"use strict";
const request = require("./servicerequest");
const { SQS } = require("aws-sdk");

const sqs = new SQS();

module.exports.scrapper = async (event) => {
  const input=JSON.parse(event.body);
  const url=input.url;
  console.log(url);
  const id = await request.webscrapper(url);
  const payload = {
    "id" : id,
    "url" : url
  }
  console.log(payload)
  //Send SQS
  try {
    await sqs
      .sendMessage({
        QueueUrl: 'https://sqs.us-east-2.amazonaws.com/862836902890/scrapperjobqueue/',
        MessageBody: JSON.stringify(payload)
      })
      .promise();

    //message = "Message accepted!";
  } catch (error) {
    console.log(error);
    //message = error;
    //statusCode = 500;
  }
  console.log(id);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `ServiceRequest is successful for id : ${id}`,
        input: event,
      },
      null,
      2
    ),
  };
};
module.exports.status = async (event) => {
  const input=JSON.parse(event.body);
  const id=input.servicerequestid;
  console.log(id);
  const currentstatus = await request.getcurrentstatus(id);
  console.log(currentstatus);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Status of ServiceRequestId: ${id} is ${currentstatus}`,
        input: event,
      },
      null,
      2
    ),
  };
};
