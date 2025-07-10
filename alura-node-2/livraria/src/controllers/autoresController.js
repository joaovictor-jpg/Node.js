import { Autor } from "../db/Autor.js";

class AutoresController {
    static async listaAutor(req, res) {
        try {
            const listaAutor = await Autor.find({});
            res.status(200).json(listaAutor);
        } catch (erro) {
            res.status(500).json({ message: "Falha na busca", error: erro.message });
        }
    };

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await Autor.create(req.body);
            res.status(201).json({ message: "Autor cadastrado com sucesso!", autor: novoAutor });
        } catch (erro) {
            res.status(500).json({ message: "Falha ao cadastrar autor", error: erro.message });
        }
    };

    static async buscarPorId(req, res) {
        try {
            const id = req.params.id;
            const Autor = await Autor.findById(id);
            if (Autor) {
                res.status(200).json(Autor);
            } else {
                res.status(404).send("Autor não encontrado.");
            }
        } catch (erro) {
            res.status(500).json({ message: "Falha na busca", error: erro.message });
        }
    };

    static async atualizarDadosAutor(req, res) {
        try {
            const id = req.params.id;
            await Autor.findByIdAndUpdate(id, req.body);
            res.status(200).send("Autor atualizado com sucesso!");
        } catch (erro) {
            res.status(500).json({ message: "Falha na atualização", error: erro.message });
        }
    };

    static async deletarAutor(req, res) {
        try {
            const id = req.params.id;
            await Autor.findByIdAndDelete(id);
            res.status(200).send("Autor deletado com sucesso!");
        } catch (erro) {
            res.status(500).json({ message: "Falha ao deletar autor", error: erro.message });
        }
    };
};

export default AutoresController;
