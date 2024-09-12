import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

  static listarAutores = async (_, res, next) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);

    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {

    try {
      const id = req.params.id;

      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado.", 404));
      }

    } catch (erro) {
      next(erro);
    }
  };


  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = autor.save();

      req.resultado = autorResultado;
      next();
    } catch (erro) {
      next(erro);
    }
  };


  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autor = await autores.findByIdAndUpdate(id, { $set: req.body });

      if (autor !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Autor não encontrado", 404));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autor = await autores.findByIdAndDelete(id);

      if (autor !== null) {
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        next(new NaoEncontrado("Autor não encontrado", 404));
      }

    } catch (erro) {
      next(erro);
    }
  };


}

export default AutorController;