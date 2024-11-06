import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/Endereco";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRespository";
import { NaoEncontrado, RequisicaoRui } from "../utils/manipulaErros";

export default class AbrigoRepository implements InterfaceAbrigoRepository {

    constructor(private repository: Repository<AbrigoEntity>) { }

    private async verificaCelularAbrigo(celular: string) {
        return !!(await this.repository.findOne({ where: { celular } }));
    }

    private async existeAbrigoComEmail(email: string): Promise<boolean> {
        return !!(await this.repository.findOne({ where: { email } }));
    }

    async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
        if (await this.verificaCelularAbrigo(abrigo.celular)) {
            throw new RequisicaoRui("Celular já cadastrado");
        }
        if (await this.existeAbrigoComEmail(abrigo.email)) {
            throw new RequisicaoRui("Email já cadastrado");
        }
        await this.repository.save(abrigo);
    }
    async listaAbrigos(): Promise<AbrigoEntity[]> {
        return await this.repository.find();
    }
    async atualizaAbrigo(id: number, abrigo: AbrigoEntity) {
        const abrigoToUpdate = await this.repository.findOne({ where: { id } });

        if (!abrigoToUpdate) {
            throw new NaoEncontrado("Abrigo não encontrado");
        }

        Object.assign(abrigoToUpdate, abrigo);

        await this.repository.save(abrigoToUpdate);
    }
    async deletaAbrigo(id: number) {
        const abrigoDelete = await this.repository.findOne({ where: { id } });

        if (!abrigoDelete) {
            throw new NaoEncontrado("Abrigo não encontrado");
        }

        await this.repository.remove(abrigoDelete);
    }
    async atualizaEnderecoAdotante(idAbrigo: number, endereco: EnderecoEntity) {
        const abrigo = await this.repository.findOne({ where: { id: idAbrigo } });

        if (!abrigo) {
            throw new NaoEncontrado("Abrigo não encontrado");
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);

        abrigo.endereco = novoEndereco;

        await this.repository.save(abrigo);
    }

}