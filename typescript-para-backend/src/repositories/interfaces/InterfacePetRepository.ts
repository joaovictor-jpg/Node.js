import PetEntity from "../../entity/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
    criaPet(pet: PetEntity): void;
    listaPet(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizarPet(id: number, pet: PetEntity): Promise<{ success: boolean; message?: string }> | void;
    deletePet(id: number): Promise<{ success: boolean; message?: string }> | void;
    buscarPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> | void;
    buscarPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> | PetEntity[];
}