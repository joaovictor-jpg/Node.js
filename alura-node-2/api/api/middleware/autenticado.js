const { verify, decode } = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido.' })
    }

    const [, jwt] = token.split(' ')

    try {
        verify(jwt, '698dc19d489c4e4db73e28a713eab07b')

        const { id, email } = await decode(jwt)

        req.usuarioId = id
        req.usuarioEmail = email

        return next();
    } catch (error) {
        res.status(401).json({ error: 'Token de autenticação inválido.' })
    }
}