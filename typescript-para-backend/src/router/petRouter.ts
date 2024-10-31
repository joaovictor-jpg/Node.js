import express, { Request, RequestHandler, Response } from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyPet } from "../midlleware/validadores/petBodyRequest";

const router = express.Router();

const petRepository = new PetRepository(AppDataSource.getRepository("PetEntity"), AppDataSource.getRepository("AdotanteEntity"));

const petController = new PetController(petRepository);

const validateBodyPet: RequestHandler = (req, res, next) => middlewareValidadorBodyPet(req, res, next);

router.post('/', validateBodyPet, (req: Request, res: Response) => { petController.criaPet(req, res) });
router.get('/', (req: Request, res: Response) => { petController.listaPet(req, res) });
router.put('/:id', (req: Request, res: Response) => { petController.atualizarPet(req, res) });
router.delete('/:id', (req: Request, res: Response) => { petController.delete(req, res) });
router.put('/:pet_id/:adotado_id', (req: Request, res: Response) => { petController.adotaPet(req, res) });
router.get('/filtroPorte', (req: Request, res: Response) => { petController.buscarPetPeloPorte(req, res) });
router.get('/filtros', (req: Request, res: Response) => { petController.buscaPorCampoGenerico(req, res) });

export default router;