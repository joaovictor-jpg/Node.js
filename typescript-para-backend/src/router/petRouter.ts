import express, { Request, Response } from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();

const petRepository = new PetRepository(AppDataSource.getRepository("PetEntity"));

const petController = new PetController(petRepository);

router.post('/', (req: Request, res: Response) => { petController.criaPet(req, res) });
router.get('/', (req: Request, res: Response) => { petController.listaPet(req, res) });
router.put('/:id', (req: Request, res: Response) => { petController.atualizarPet(req, res) });
router.delete('/:id', (req: Request, res: Response) => { petController.delete(req, res) });

export default router;