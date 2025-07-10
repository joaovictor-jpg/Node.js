import express from "express";
import AutoresController from "../controllers/autoresController.js";

const routes = express.Router();

routes.get("/autor", AutoresController.listaAutor);
routes.get("/autor/:id", AutoresController.buscarPorId);
routes.post("/autor", AutoresController.cadastrarAutor);
routes.put("/autor/:id", AutoresController.atualizarDadosAutor);
routes.delete("/autor/:id", AutoresController.deletarAutor);

export default routes;
