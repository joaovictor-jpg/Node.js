function buildResponse(status, body, headers) {
    return {
        statusCode: status,
        header: {
            'Content-Type': 'application/json',
            headers
        },
        body: JSON.stringify(body)
    }
}

module.exports = { buildResponse };