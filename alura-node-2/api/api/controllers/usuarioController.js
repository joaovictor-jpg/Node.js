const UsuarioService = require('../services/usuarioService');

const usuarioService = new UsuarioService();

class UsuarioController {
    static async cadastrar(req, res) {
        try {
            const {nome, email, senha} = req.body;
            const usuario = await usuarioService.cadastrar({nome, email, senha});
            return res.status(201).json(usuario);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async buscarTodos(req, res) {
        try {
            const usuarios = await usuarioService.buscarTodos();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    }

    static async buscarPorId(req, res) {
        const { id } = req.params;
        try {
            const usuario = await usuarioService.buscarPorId(id);
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    static async atualizar(req, res) {
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        try {
            const usuarioAtualizado = await usuarioService.atualizar(id, { nome, email, senha });
            return res.status(200).json(usuarioAtualizado);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    static async deletar(req, res) {
        const { id } = req.params;
        try {
            const response = await usuarioService.deletar(id);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

module.exports = UsuarioController