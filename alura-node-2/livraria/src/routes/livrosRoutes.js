import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listaLivros, paginar);
routes.get("/livros/busca", LivroController.listarPorFiltro);
routes.get("/livros/:id", LivroController.buscarPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarDadosLivro);
routes.delete("/livros/:id", LivroController.deletarLivro);

export default routes;
