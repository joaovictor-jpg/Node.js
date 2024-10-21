const { buildResponse } = require('./utils');
const { sign, verify } = require('jsonwebtoken');
const { pbkdf2Sync } = require('crypto');

function createToken(username, id) {
    const token = sign({ username, id: id }, process.env.JWT_TOKEN, { expiresIn: '24h', audience: 'alura-serverless' })
    return token
}

async function authorize(event) {
    const { authorization } = event.headers
    if (!authorization) {
        return buildResponse(401, { error: 'Missing authorization headers' });
    }

    const [type, token] = authorization.split(' ')
    if (type !== 'Bearer' || !token) {
        return buildResponse(401, { error: 'Unsuported authorization type' })
    }

    const decodedToken = verify(token, process.env.JWT_TOKEN, {
        audience: 'alura-serverless'
    })

    if (!decodedToken) {
        return buildResponse(401, { error: 'Invalid Token' })
    }

    return decodedToken;
}

function makeHash (password) {
    return pbkdf2Sync(password, process.env.SALT, 100000, 64, 'sha512').toString('hex')
}

module.exports = {
    createToken,
    authorize,
    makeHash
}