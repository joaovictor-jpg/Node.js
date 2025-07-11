import { Autor, Livro } from "../db/index.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class LivroController {
  static async listaLivros(req, res, next) {
    try {
      const buscarLivro = Livro.find();
      req.resultado = buscarLivro;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await Autor.findById(novoLivro.autor);
      if (autorEncontrado === null) {
        next(new NaoEncontrado("Autor não foi encontrado"));
      }
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
      const livroCriado = await Livro.create(livroCompleto);
      res.status(201).json({ message: "Livro cadastrado com sucesso!", livro: livroCriado });
    } catch (erro) {
      next(erro);
    }
  };

  static async buscarPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livro = await Livro.findById(id);
      if (livro) {
        res.status(200).json(livro);
      } else {
        next(new NaoEncontrado("Livro não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static async listarPorFiltro(req, res, next) {
    const { editora, titulo, nomeAutor } = req.query;

    const busca = {};

    if (editora) busca.editora = editora;
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
    if (nomeAutor) busca.autor.nome = nomeAutor;

    try {
      const livroPorEditora = await Livro.find(busca);
      if (livroPorEditora) {
        res.status(200).json({ livroPorEditora });
      } else {
        next(new NaoEncontrado("Editora não encontrada"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarDadosLivro(req, res, next) {
    try {
      const id = req.params.id;
      await Livro.findByIdAndUpdate(id, req.body);
      res.status(200).send("Livro atualizado com sucesso!");
    } catch (erro) {
      next(erro);
    }
  };

  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await Livro.findByIdAndDelete(id);
      res.status(200).send("Livro deletado com sucesso!");
    } catch (erro) {
      next(erro);
    }
  };
};

export default LivroController;
