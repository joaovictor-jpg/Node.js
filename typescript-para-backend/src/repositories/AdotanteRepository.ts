import { Repository } from "typeorm";
import AdotanteEntity from "../entity/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entity/Endereco";
import { NaoEncontrado } from "../utils/manipulandoErros";

export default class AdotanteRepository implements InterfaceAdotanteRepository {

    constructor(private repository: Repository<AdotanteEntity>) { }

    async criaAdotante(adotante: AdotanteEntity): Promise<void> {
        await this.repository.save(adotante);
    }

    async listaAdotante(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
    }

    async atualizaAdotanteEntity(id: number, adotanteEntity: AdotanteEntity): Promise<{ success: boolean; message?: string }> {
        const adotanteToUpdate = await this.repository.findOne({ where: { id } });

        if (!adotanteToUpdate) {
            throw new NaoEncontrado("Adotante não encontrado");
        }

        Object.assign(adotanteToUpdate, adotanteEntity);

        await this.repository.save(adotanteToUpdate);

        return { success: true };
    }

    async deletaAdotante(id: number): Promise<{ success: boolean; message?: string; }> {
        const adotanteToRemove = await this.repository.findOne({ where: { id } });

        if (!adotanteToRemove) {
            throw new NaoEncontrado("Adotante não encontrado");
        }

        await this.repository.remove(adotanteToRemove);

        return { success: true }
    }

    async atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string; }> {
        const adotante = await this.repository.findOne({
            where: { id: idAdotante },
        });

        if (!adotante) {
            throw new NaoEncontrado("Adotante não encontrado");
        }

        const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
        adotante.endereco = novoEndereco;
        await this.repository.save(adotante);
        return { success: true };
    }

}