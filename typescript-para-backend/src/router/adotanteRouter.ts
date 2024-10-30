import express, { NextFunction, Request, RequestHandler, Response } from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyAdotante } from "../midlleware/validadores/adotanteBodyRequest";
import { middlewareValidadorBodyEndereco } from "../midlleware/validadores/enderecoBodyRequest";

const router = express.Router();

const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));

const adotanteController = new AdotanteController(adotanteRepository);

const validateBodyAdotante: RequestHandler = (req, res, next) => middlewareValidadorBodyAdotante(req, res, next);

const validateBodyEndereco: RequestHandler = (req, res, next) => middlewareValidadorBodyEndereco(req, res, next);

    router.post('/', validateBodyAdotante, (req: Request, res: Response) => { adotanteController.criaAdotante(req, res) });
router.get('/', (req: Request, res: Response) => { adotanteController.listaAdotante(req, res) });
router.put('/:id', (req: Request, res: Response) => { adotanteController.atualizarAdotante(req, res) });
router.delete('/:id', (req: Request, res: Response) => { adotanteController.deletarAdotante(req, res) });
router.patch('/:id', validateBodyEndereco , (req: Request, res: Response) => { adotanteController.atualizaEnderecoAdotante(req, res) });

export default router;
