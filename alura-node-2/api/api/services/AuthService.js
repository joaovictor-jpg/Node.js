const database = require('../models');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

class AuthService {
    async login(dto) {
        try {

            if (!dto.email || !dto.senha) {
                throw new Error('Email e senha são obrigatórios.');
            }

            const usuario = await database.usuarios.findOne({
                attributes: ['id', 'email', 'senha'],
                where: {
                    email: dto.email
                }
            })

            if (!usuario) {
                return null;
            }

            const isPasswordValid = await compare(dto.senha, usuario.senha);

            if (!isPasswordValid) {
                return null;
            }


            const token = sign({
                id: usuario.id,
                email: usuario.email
            }, '698dc19d489c4e4db73e28a713eab07b', {
                expiresIn: 86400
            })

            console.log(token)

            return { token };
        } catch (error) {
            console.log(error)
            throw new Error('Erro ao realizar login', error.message);
        }
    }
}

module.exports = AuthService