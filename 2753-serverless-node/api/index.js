"use strict";
const { MongoClient, ObjectId } = require('mongodb');

async function connectionToDatabase() {
  const client = new MongoClient(process.env.MONGODB_CONNECTIONSTRING);
  const connection = await client.connect();
  return connection.db(process.env.MONGODB_DB_NAME);
}

function extractBody(event) {
  if (!event?.body) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        error: 'Missing Body'
      })
    }
  }

  return JSON.parse(event.body)
}

module.exports.sendResponse = async (event) => {

  const correctQuestions = [3, 1, 0, 2]

  const { name, answers } = extractBody(event)
  const totalCorrectAnswers = answers.reduce((acc, answer, index) => {
    if (answer === correctQuestions[index]) {
      acc++
    }
    return acc
  }, 0)

  const result = {
    name,
    answers,
    totalCorrectAnswers,
    totalAnswers: answers.length
  }

  const client = await connectionToDatabase();
  const collection = await client.collection('results');
  const { insertedId } = await collection.insertOne(result);

  return {
    statusCode: 201,
    body: JSON.stringify({
      resultId: insertedId,
      __hypermedia: {
        href: `/results.html`,
        query: { id: insertedId }
      }
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

module.exports.getResult = async (event) => {
  const client = await connectionToDatabase();
  const collection = await client.collection('results');
  const result = await collection.findOne({
    _id: new ObjectId(event.pathParameters.id)
  })
  if (!result) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Result not fount' }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }
  return {
    statusCode: 200,
    headers: {
      'Conent-Type': 'application/json'
    },
    body: JSON.stringify(result)
  }
}
