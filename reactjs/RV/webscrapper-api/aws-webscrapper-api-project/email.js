"use strict";

module.exports.scrapper = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless email v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
