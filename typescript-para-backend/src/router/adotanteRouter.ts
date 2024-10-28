import express, { Request, Response } from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();

const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));

const adotanteController = new AdotanteController(adotanteRepository);

router.post('/', (req: Request, res: Response) => { adotanteController.criaAdotante(req, res) });
router.get('/', (req: Request, res: Response) => { adotanteController.listaAdotante(req, res) });
router.put('/:id', (req: Request, res: Response) => { adotanteController.atualizarAdotante(req, res) });
router.delete('/:id', (req: Request, res: Response) => { adotanteController.deletarAdotante(req, res) });
router.patch('/:id', (req: Request, res: Response) => { adotanteController.atualizaEnderecoAdotante(req, res) });

export default router;
