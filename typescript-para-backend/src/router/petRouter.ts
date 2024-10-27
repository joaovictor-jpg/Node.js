import express, { Request, Response } from "express";
import PetController from "../controller/PetController";

const router = express.Router();

const petController = new PetController();

router.post('/', (req: Request, res: Response) => { petController.criaPet(req, res) });

export default router;