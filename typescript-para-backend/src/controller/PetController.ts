import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecies.js";
import PetRepository from "../repositories/PetRepository.js";
import PetEntity from "../entity/PetEntity.js";

let id = 0;
function geraId() {
    id = id + 1;
    return id;
}

export default class PetController {
    constructor(private repository: PetRepository) { }

    async criaPet(req: Request, res: Response) {
        const { nome, especie, adotado, dataDeNascimento } = <PetEntity>req.body;
        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ error: "Especie inválida" });
        }
        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
        await this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }

    async listaPet(req: Request, res: Response) {
        const listaPet: Array<PetEntity> = await this.repository.listaPet();
        return res.status(200).json(listaPet);
    }

    async atualizarPet(req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.atualizarPet(Number(id), req.body as PetEntity);

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.deletePet(Number(id));

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }

    async adotaPet(req: Request, res: Response) {
        const { pet_id, adotado_id } = req.params;
        const { success, message } = await this.repository.adotaPe(Number(pet_id), Number(adotado_id));
        if (!success) {
            return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }
}