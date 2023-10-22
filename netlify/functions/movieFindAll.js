"use strict"

const clientPromise = require('./mongodb');
//const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200,  headers: {
      'Access-Control-Allow-Origin': '*', // O el dominio desde el que se permiten las solicitudes.
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS'
    }, body: "OK" };
  }

  try {
    const client = await clientPromise;

    const authors = await client.db("proyectodb").collection("movie").find({}).toArray();

    return { statusCode: 200,  headers: {
      'Access-Control-Allow-Origin': '*', // O el dominio desde el que se permiten las solicitudes.
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS'
    }, body: JSON.stringify(authors)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400,  headers: {
      'Access-Control-Allow-Origin': '*', // O el dominio desde el que se permiten las solicitudes.
      'Access-Control-Allow-Headers': 'content-type',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS'
    }, body: JSON.stringify(error) };
  }
};