import AdotanteEntity from "../entity/AdotanteEntity";

type TipoRequestAdotanteBody = Omit<AdotanteEntity, "id">;
type TipoRequestAdotanteParams = { id?: string };
type TipoResponseAdotanteBody = {
    data?: Pick<AdotanteEntity, "id" | "nome" | "celular"> | Pick<AdotanteEntity, "id" | "nome" | "celular">[],
    error?: unknown
};

export { TipoRequestAdotanteBody, TipoRequestAdotanteParams, TipoResponseAdotanteBody };