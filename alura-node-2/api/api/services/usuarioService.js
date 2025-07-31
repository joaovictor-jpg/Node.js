const database = require('../models')
const { hash } = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')

class UsuarioService {
    async cadastrar(dto) {

        co
        const usuario = await database.usuarios.findOne({
            
            where: {
                email: dto.email
            }
        })

        if (usuario)
            throw new Error('Usuário já cadastrado com este email')

        try {
            const senhaHash = await hash(dto.senha, 8)

            const novoUsuario = await database.usuarios.create({
                id: uuidv4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            })

            return novoUsuario;
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            throw new Error('Erro ao cadastrar usuário', error.message);
        }
    }

    async buscarTodos() {
        return await database.usuarios.findAll();
    }

    async buscarPorId(id) {
        const usuario = await database.usuarios.findByPk(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        return usuario;
    }

    async atualizar(id, dto) {
        try {
            let usuario = await database.usuarios.findByPk(id);
            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }

            usuario = atualizarUsuario(usuario, dto);

            return await usuario.save();

        } catch (error) {
            throw new Error('Erro ao atualizar usuário', error.message);
        }
    }

    async deletar(id) {
        const usuario = await database.usuarios.findByPk(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        await usuario.destroy();
        return { message: 'Usuário deletado com sucesso' };
    }
}

function atualizarUsuario(usuario, dto) {
    if (dto.nome) {
        usuario.nome = dto.nome;
    }
    if (dto.email) {
        usuario.email = dto.email;
    }
    if (dto.senha) {
        usuario.senha = dto.senha;
    }

    return usuario;
}

module.exports = UsuarioService