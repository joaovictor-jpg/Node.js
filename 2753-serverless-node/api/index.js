"use strict";

const { buildResponse } = require('./utils.js');
const { getUserByCredential, saveResultsToDatabase, getResultById } = require('./database.js');
const { createToken, authorize, makeHash } = require('./auth.js');
const countCorrectAnswers = require('./response.js');

function extractBody(event) {
  if (!event?.body) {
    return buildResponse(422, {
      error: 'Missing Body'
    })
  }

  return JSON.parse(event.body)
}

module.exports.login = async (event) => {
  const { username, password } = extractBody(event)

  const hashedPass = makeHash(password);

  const user = await getUserByCredential(username, hashedPass);

  if (!user) {
    return buildResponse(401, {
      error: 'invalid credential'
    })
  }

  const token = createToken(user.username, user._id);

  return buildResponse(200, { token },)
}

module.exports.sendResponse = async (event) => {

  const authResult = await authorize(event);

  if (authResult.statusCode === 401) return authResult;

  const { name, answers } = extractBody(event)

  const result = countCorrectAnswers(name, answers)

  const insertedId = await saveResultsToDatabase(result);

  return buildResponse(201, {
    resultId: insertedId,
    __hypermedia: {
      href: `/results.html`,
      query: { id: insertedId }
    }
  })
};

module.exports.getResult = async (event) => {

  const authResult = await authorize(event);

  if (authResult.statusCode === 401) return authResult;

  const result = await getResultById(event.pathParameters.id)

  if (!result) {
    return buildResponse(404, { error: 'Result not fount' })
  }

  return buildResponse(200, result)
}
