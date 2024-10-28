import { Repository } from "typeorm";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import PetEntity from "../entity/PetEntity";
import AdotanteRepository from "./AdotanteRepository";
import AdotanteEntity from "../entity/AdotanteEntity";

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
        try {
            const petToUpdate = await this.repository.findOne({ where: { id } });

            if (!petToUpdate) {
                return { success: false, message: "Pet não encontrado" };
            }

            Object.assign(petToUpdate, pet);

            await this.repository.save(petToUpdate);

            return { success: true }
        } catch (error) {
            console.log(error);

            return {
                success: false,
                message: "Ocorreu um error ao tentar atualizar o pet",
            };
        }
    }

    async deletePet(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const petToRemove = await this.repository.findOne({ where: { id } });
            if (!petToRemove) {
                return { success: false, message: "Pet não encontrado" };
            }
            await this.repository.remove(petToRemove);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: "Ocorreu um error ao tentar excluir o pet"
            };
        }
    }

    async adotaPe(idPet: number, idAdotante: number): Promise<{ success: boolean, message?: string }> {
        const pet = await this.repository.findOne({ where: { id: idPet } });
        if (!pet) {
            return { success: false, message: "Pet não encontrado" };
        }
        const adotante = await this.adotanteRepository.findOne({ where: { id: idAdotante } });
        if (!adotante) {
            return { success: false, message: "Pet não encontrado" };
        }

        pet.adotante = adotante;
        pet.adotado = true;
        await this.repository.save(pet);
        return { success: true }
    }

}