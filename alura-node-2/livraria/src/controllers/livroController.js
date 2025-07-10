import { Autor } from "../db/Autor.js";
import Livro from "../db/livro.js";

class LivroController {
    static async listaLivros(req, res) {
        try {
            const listaLivros = await Livro.find({});
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: "Falha na busca", error: erro.message });
        }
    };

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await Autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
            const livroCriado = await Livro.create(livroCompleto);
            res.status(201).json({ message: "Livro cadastrado com sucesso!", livro: livroCriado });
        } catch (erro) {
            res.status(500).json({ message: "Falha ao cadastrar livro", error: erro.message });
        }
    };

    static async buscarPorId(req, res) {
        try {
            const id = req.params.id;
            const livro = await Livro.findById(id);
            if (livro) {
                res.status(200).json(livro);
            } else {
                res.status(404).send("Livro não encontrado.");
            }
        } catch (erro) {
            res.status(500).json({ message: "Falha na busca", error: erro.message });
        }
    };

    static async listarLivroPorEditora(req, res) {
        const editora = req.query.editora;
        try {
            const livroPorEditora = await Livro.find({editora: editora});
            res.status(200).json({livroPorEditora});
        } catch (erro) {
            res.status(500).json({ message: "Falha na busca", error: erro.message });
        }
    }

    static async atualizarDadosLivro(req, res) {
        try {
            const id = req.params.id;
            await Livro.findByIdAndUpdate(id, req.body);
            res.status(200).send("Livro atualizado com sucesso!");
        } catch (erro) {
            res.status(500).json({ message: "Falha na atualização", error: erro.message });
        }
    };

    static async deletarLivro(req, res) {
        try {
            const id = req.params.id;
            await Livro.findByIdAndDelete(id);
            res.status(200).send("Livro deletado com sucesso!");
        } catch (erro) {
            res.status(500).json({ message: "Falha ao deletar livro", error: erro.message });
        }
    };
};

export default LivroController;
