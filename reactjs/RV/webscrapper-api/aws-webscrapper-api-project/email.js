"use strict";
const request = require("./servicerequest");
module.exports.scrapper = async (event) => {
  const input=JSON.parse(event.body);
  const url=input.url;
  console.log(url);
  const res = await request(url);
  console.log(res);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Service Request is successful for id : "+res,
        input: event,
      },
      null,
      2
    ),
  };
};
