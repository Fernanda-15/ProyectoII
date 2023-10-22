"use strict"

const rabbitPromise = require('./rabbitMQ');

const headers = require('./headersCORS');

const url = 'https://proyecto2-sistemas-distribuidos-movie.netlify.app/.netlify/functions/'

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const channel = await rabbitPromise();
    console.log("RABIT", channel);
    let message = await channel.get("proyecto",{'noAck':true});
    while (message) {
      const request = JSON.parse(message.content.toString());
      switch (request.method) {
        case "DELETE":
          await fetch(url+'movieDeleteBatch/'+request.id, {
            method: "DELETE",
            headers: {"Content-type": "application/json"}});
          break;
        case "UPDATE":
          await fetch(url+'movieUpdateBatch/'+request.id, {
            headers: {"Content-type": "application/json"},
            method: "PUT", body: JSON.stringify(request.body)});
          break;
        case "INSERT":
          await fetch(url+'movieInsertBatch', {
            headers: {"Content-type": "application/json"},
            method: "POST",body: JSON.stringify(request.body)});
          break;
      }
      message = await channel.get("proyecto",{'noAck':true});
    }
    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};