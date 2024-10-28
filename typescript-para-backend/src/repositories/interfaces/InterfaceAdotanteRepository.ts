import AdotanteEntity from "../../entity/AdotanteEntity";
import EnderecoEntity from "../../entity/Endereco";

export default interface InterfaceAdotanteRepository {
    criaAdotante(adotante: AdotanteEntity): void | Promise<void>;
    listaAdotante(): AdotanteEntity[] | Promise<AdotanteEntity[]>
    atualizaAdotanteEntity(id: number, adotanteEntity: AdotanteEntity): Promise<{ success: boolean; message?: string }> | void;
    deletaAdotante(id: number): Promise<{ success: boolean; message?: string }> | void;
    atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string }> | void;
}