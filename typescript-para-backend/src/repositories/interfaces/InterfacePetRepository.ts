import PetEntity from "../../entity/PetEntity";

export default interface InterfacePetRepository {
    criaPet(pet: PetEntity): void;
    listaPet(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizarPet(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> | void;
    deletePet(id: number): Promise<{ success: boolean; message?: string }> | void;
}