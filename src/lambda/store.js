const { builder } = require('@netlify/functions')

const handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:4005",
      "Access-Control-Allow-Methods": "GET"
    }
  }
}

exports.handler = builder(handler)