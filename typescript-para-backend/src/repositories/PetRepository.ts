import { Repository } from "typeorm";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import PetEntity from "../entity/PetEntity";
import AdotanteEntity from "../entity/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";
import { NaoEncontrado } from "../utils/manipulandoErros";

export default class PetRepository implements InterfacePetRepository {
    private repository: Repository<PetEntity>;
    private adotanteRepository: Repository<AdotanteEntity>

    constructor(repository: Repository<PetEntity>, adotanteRepository: Repository<AdotanteEntity>) {
        this.repository = repository;
        this.adotanteRepository = adotanteRepository;
    }

    criaPet(pet: PetEntity): void {
        this.repository.save(pet);
    }

    async listaPet(): Promise<PetEntity[]> {
        return await this.repository.find()
    }

    async atualizarPet(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> {

        const petToUpdate = await this.repository.findOne({ where: { id } });

        if (!petToUpdate) {
            throw new NaoEncontrado("Pet não encontrado");
        }

        Object.assign(petToUpdate, pet);

        await this.repository.save(petToUpdate);

        return { success: true };
    }

    async deletePet(id: number): Promise<{ success: boolean; message?: string }> {
        const petToRemove = await this.repository.findOne({ where: { id } });
        if (!petToRemove) {
            throw new NaoEncontrado("Pet não encontrado");
        }
        await this.repository.remove(petToRemove);
        return { success: true };
    }

    async adotaPe(idPet: number, idAdotante: number): Promise<{ success: boolean, message?: string }> {
        const pet = await this.repository.findOne({ where: { id: idPet } });
        if (!pet) {
            throw new NaoEncontrado("Pet não encontrado");
        }
        const adotante = await this.adotanteRepository.findOne({ where: { id: idAdotante } });
        if (!adotante) {
            throw new NaoEncontrado("Adotante não encontrado");
        }

        pet.adotante = adotante;
        pet.adotado = true;
        await this.repository.save(pet);
        return { success: true }
    }

    async buscarPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> {
        const pets = await this.repository.find({ where: { porte } });
        return pets;
    }

    async buscarPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> {
        const pets = await this.repository.find({ where: { [campo]: valor } });
        return pets;
    }

}