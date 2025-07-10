import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();

routes.get("/livros", LivroController.listaLivros);
routes.get("/livros/busca", LivroController.listarLivroPorEditora);
routes.get("/livros/:id", LivroController.buscarPorId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarDadosLivro);
routes.delete("/livros/:id", LivroController.deletarLivro);

export default routes;
