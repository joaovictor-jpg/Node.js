import PetEntity from "../entity/PetEntity";

type TipoRequestPetBody = Omit<PetEntity, "id">;

type TipoRequestPetParams = { 
    id?: string,
    pet_id?: string,
    adotado_id?: string
 };

type TipoResponsePetBody = {
    dados?: Pick<PetEntity, "id" | "nome" | "porte" | "especie"> | Pick<PetEntity, "id" | "nome" | "porte" | "especie">[];
    erros?: unknown
}

export { TipoRequestPetBody, TipoRequestPetParams, TipoResponsePetBody }