import { Autor } from "../db/index.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class AutoresController {
  static async listaAutor(req, res, next) {
    try {
      const listaAutor = Autor.find();
      req.resultado = listaAutor;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await Autor.create(req.body);
      res.status(201).json({ message: "Autor cadastrado com sucesso!", autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  };

  static async buscarPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autor = await Autor.findById(id);
      if (autor !== null) {
        res.status(200).json(autor);
      } else {
        next(new NaoEncontrado("Autor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static async atualizarDadosAutor(req, res, next) {
    try {
      const id = req.params.id;
      await Autor.findByIdAndUpdate(id, req.body);
      res.status(200).send("Autor atualizado com sucesso!");
    } catch (erro) {
      next(erro);
    }
  };

  static async deletarAutor(req, res, next) {
    try {
      const id = req.params.id;
      await Autor.findByIdAndDelete(id);
      res.status(200).send("Autor deletado com sucesso!");
    } catch (erro) {
      next(erro);
    }
  };
};

export default AutoresController;
