const AuthService = require('../services/AuthService')

const authService = new AuthService()

class AuthController {
    static async login(req, res) {
        try {
            const { email, senha } = req.body
            const token = await authService.login({email, senha})
            if (!token) {
                return res.status(401).json({ message: 'Invalid credentials' })
            }
            return res.status(200).json({ token })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = AuthController