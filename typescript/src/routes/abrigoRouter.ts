import { RequestHandler, Router } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import AbrigoController from "../controller/AbrigoController";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyAbrigo } from "../middleware/validadores/abrigoRequestBody";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = Router();

const abrigoRepository = new AbrigoRepository(
    AppDataSource.getRepository("AbrigoEntity")
);

const abrigoController = new AbrigoController(abrigoRepository);

const validateBodyAbrigo: RequestHandler = (req, res, next) => middlewareValidadorBodyAbrigo(req, res, next);

const validateBodyEndereco: RequestHandler = (req, res, next) => middlewareValidadorBodyEndereco(req, res, next);

router.post("/", validateBodyAbrigo, (req, res) => abrigoController.criaAbrigo(req, res));
router.get("/", (req, res) => abrigoController.listaAbrigos(req, res));
router.put("/:id", verificaIdMiddleware, (req, res) => abrigoController.atualizaAbrigo(req, res));
router.patch("/:id", verificaIdMiddleware, validateBodyEndereco, (req, res) => abrigoController.atualizaEnderecoAbrigo(req, res));

export default router;
