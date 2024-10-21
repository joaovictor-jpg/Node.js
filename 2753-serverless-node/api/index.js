"use strict";
const { MongoClient, ObjectId } = require('mongodb');
const { pbkdf2Sync, ECDH } = require('crypto');
const { sign, verify } = require('jsonwebtoken');
const { error } = require('console');

let connectionInstance = null

async function connectionToDatabase() {
  if (connectionInstance) return connectionInstance;
  const client = new MongoClient(process.env.MONGODB_CONNECTIONSTRING);
  const connection = await client.connect();
  connectionInstance = connection.db(process.env.MONGODB_DB_NAME);
  return connectionInstance
}

async function authorize(event) {
  const { authorization } = event.headers
  if (!authorization) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Missing authorization header' })
    }
  }

  const [type, token] = authorization.split(' ')
  if (type !== 'Bearer' || !token) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'Unsuported authorization type'
      })
    }
  }

  const decodedToken = verify(token, process.env.JWT_TOKEN, {
    audience: 'alura-serverless'
  })

  if (!decodedToken) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid Token' })
    }
  }

  return decodedToken;
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

module.exports.login = async (event) => {
  const { username, password } = extractBody(event)

  const hashedPass = pbkdf2Sync(password, process.env.SALT, 100000, 64, 'sha512').toString('hex')

  const client = await connectionToDatabase();
  const collection = await client.collection('users')
  const user = await collection.findOne({
    name: username,
    password: hashedPass
  })

  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'invalid credential'
      })
    }
  }

  const token = sign({ username, id: user._id }, process.env.JWT_TOKEN, { expiresIn: '24h', audience: 'alura-serverless' })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  }
}

module.exports.sendResponse = async (event) => {

  const authResult = await authorize(event);

  if (authResult.statusCode === 401) return authResult;

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

  const authResult = await authorize(event);

  if (authResult.statusCode === 401) return authResult;

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
