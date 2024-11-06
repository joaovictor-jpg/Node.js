import { Request, Response } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { TipoRequestBodyAbrigo, TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from "../tipos/tipoAbrigo";
import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/Endereco";

export default class AbrigoController {
    constructor(private repository: AbrigoRepository) { }

    async criaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>) {
        
        const abrigo = <AbrigoEntity>req.body;

        await this.repository.criaAbrigo(abrigo);

        res.status(201).json({ dados: abrigo });
    }

    async atualizaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;

        await this.repository.atualizaAbrigo(Number(id), req.body as AbrigoEntity);

        return res.sendStatus(204);
    }

    async listaAbrigos(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>) {
        const listaDeAbrigos = await this.repository.listaAbrigos();

        const dados = listaDeAbrigos.map((abrigo) => {
            return {
                id: abrigo.id,
                nome: abrigo.nome,
                email: abrigo.email,
                celular: abrigo.celular
            }
        });

        return res.status(200).json({ dados })
    }

    async deletaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>, res: Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;
        await this.repository.deletaAbrigo(Number(id));

        return res.sendStatus(204);
    }

    async atualizaEnderecoAbrigo(req: Request<TipoRequestParamsAbrigo, {}, EnderecoEntity>, res: Response<TipoResponseBodyAbrigo>) {
        const { id } = req.params;

        await this.repository.atualizaEnderecoAdotante(Number(id), req.body);

        return res.sendStatus(204);
    }
}