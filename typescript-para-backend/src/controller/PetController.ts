import { Request, Response } from "express";
import type TipoPet from "../tipos/TiposPet.ts";
import EnumEspecie from "../enum/EnumEspecies.js";

let listaDePets: Array<TipoPet> = [];

let id = 0;
function geraId() {
    id = id + 1;
    return id;
}

export default class PetController {
    criaPet(req: Request, res: Response) {
        const { nome, especie, adotado, dataDeNascimento } = <TipoPet>req.body;
        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ error: "Especie inválida" });
        }
        const novoPet: TipoPet = { id: geraId(), nome, especie, adotado, dataDeNascimento }
        listaDePets.push(novoPet);
        return res.status(201).json(novoPet);
    }

    listaPet(req: Request, res: Response) {
        return res.status(200).json(listaDePets);
    }

    atualizarPet(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, especie, adotado, dataDeNascimento } = req.body as TipoPet;
        const pet: TipoPet = listaDePets.find((pet) => pet.id === Number(id));
        if (!pet) {
            return res.status(404).json({ erro: "Pet não encontrado" });
        }
        pet.nome = nome;
        pet.especie = especie;
        pet.adotado = adotado;
        pet.dataDeNascimento = dataDeNascimento;
        return res.status(200).json(pet);
    }

    delete(req: Request, res: Response) {
        const { id } = req.params;
        const pet: TipoPet = listaDePets.find((pet) => pet.id === Number(id));
        if (!pet) {
            return res.status(404).json({ error: "Pet não encontrado" });
        }
        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);
        return res.status(200).json({ message: "Pet deletado com sucesso" });
    }
}