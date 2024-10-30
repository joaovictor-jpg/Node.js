import PetEntity from "../entity/PetEntity";

type TipoRequestPetBody = Omit<PetEntity, "id">;

type TipoRequestPetParams = { 
    id?: string,
    pet_id?: string,
    adotado_id?: string
 };

type TipoResponsePetBody = {
    data?: Pick<PetEntity, "id" | "nome" | "porte" | "especie"> | Pick<PetEntity, "id" | "nome" | "porte" | "especie">[];
    error?: unknown
}

export { TipoRequestPetBody, TipoRequestPetParams, TipoResponsePetBody }