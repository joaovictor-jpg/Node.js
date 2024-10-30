import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entity/AdotanteEntity";
import EnderecoEntity from "../entity/Endereco";
import { TipoRequestAdotanteBody, TipoRequestAdotanteParams, TipoResponseAdotanteBody } from "../tipos/tiposAdotantes";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) { }
    async criaAdotante(req: Request<TipoRequestAdotanteParams, {}, TipoRequestAdotanteBody>, res: Response<TipoResponseAdotanteBody>) {
        try {
            const { nome, celular, endereco, foto, senha } = req.body as AdotanteEntity;

            const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

            await this.repository.criaAdotante(novoAdotante);

            return res.status(201).json({ data: { id: novoAdotante.id, nome, celular, endereco } });
        } catch (error) {
            return res.status(500).json({ error: "Error ao criar o adotante" });
        }
    }

    async listaAdotante(_: Request<{}, {}, TipoRequestAdotanteBody>, res: Response<TipoResponseAdotanteBody>) {
        const listaAdotante = await this.repository.listaAdotante();
        const data = listaAdotante.map((adotante) => {
            return {
                id: adotante.id,
                nome: adotante.nome,
                celular: adotante.celular,
                endereco: adotante.endereco !== null? adotante.endereco : undefined
            }
        })
        return res.status(200).json({ data });
    }

    async atualizarAdotante(req: Request<TipoRequestAdotanteParams, {}, TipoRequestAdotanteBody>, res: Response<TipoResponseAdotanteBody>) {
        const { id } = req.params;

        const adotante = req.body as AdotanteEntity;

        const { success, message } = await this.repository.atualizaAdotanteEntity(Number(id), adotante);

        if (!success) {
            return res.status(404).json({ error: message });
        }

        return res.sendStatus(204);
    }

    async deletarAdotante(req: Request<TipoRequestAdotanteParams, {}, TipoRequestAdotanteBody>, res: Response<TipoResponseAdotanteBody>) {
        const { id } = req.params;

        const { success, message } = await this.repository.deletaAdotante(Number(id));

        if (!success) {
            return res.status(204).json({ error: message });
        }

        return res.sendStatus(204);
    }

    async atualizaEnderecoAdotante(req: Request<TipoRequestAdotanteParams, {}, EnderecoEntity>, res: Response<TipoResponseAdotanteBody>) {
        const { id } = req.params;

        const { success, message } = await this.repository.atualizaEnderecoAdotante(Number(id), req.body);

        if (!success) {
            return res.status(404).json({ error: message });
        }

        return res.sendStatus(204);
    }
}