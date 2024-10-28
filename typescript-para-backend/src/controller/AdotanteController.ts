import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entity/AdotanteEntity";
import EnderecoEntity from "../entity/Endereco";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) { }
    async criaAdotante(req: Request, res: Response) {
        try {
            const { nome, celular, endereco, foto, senha } = req.body as AdotanteEntity;

            const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

            await this.repository.criaAdotante(novoAdotante);
            return res.status(201).json(novoAdotante);
        } catch (error) {
            return res.status(500).json({ error: 'Error ao criar o adotante' })
        }
    }

    async listaAdotante(_: Request, res: Response) {
        const listaAdotante = await this.repository.listaAdotante();
        return res.status(200).json(listaAdotante);
    }

    async atualizarAdotante(req: Request, res: Response) {
        const { id } = req.params;

        const adotante = req.body as AdotanteEntity;

        const { success, message } = await this.repository.atualizaAdotanteEntity(Number(id), adotante);

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }

    async deletarAdotante(req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletaAdotante(Number(id));

        if (!success) {
            return res.status(204).json({ message });
        }

        return res.sendStatus(204);
    }

    async atualizaEnderecoAdotante(req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.atualizaEnderecoAdotante(Number(id), req.body as EnderecoEntity);

        if (!success) {
            return res.status(404).json({ message });
        }

        return res.sendStatus(204);
    }
}