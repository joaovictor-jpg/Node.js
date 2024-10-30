import AdotanteEntity from "../entity/AdotanteEntity";

type TipoRequestAdotanteBody = Omit<AdotanteEntity, "id" | "pets">;
type TipoRequestAdotanteParams = { id?: string };
type TipoResponseAdotanteBody = {
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco"> | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[],
    error?: unknown
};

export { TipoRequestAdotanteBody, TipoRequestAdotanteParams, TipoResponseAdotanteBody };