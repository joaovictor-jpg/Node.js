import AdotanteEntity from "../entity/AdotanteEntity";

type TipoRequestAdotanteBody = Omit<AdotanteEntity, "id" | "pets">;
type TipoRequestAdotanteParams = { id?: string };
type TipoResponseAdotanteBody = {
    dados?: Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco"> | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[],
    erros?: unknown
};

export { TipoRequestAdotanteBody, TipoRequestAdotanteParams, TipoResponseAdotanteBody };