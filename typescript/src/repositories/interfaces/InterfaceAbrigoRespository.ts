import AbrigoEntity from "../../entities/AbrigoEntity";
import EnderecoEntity from "../../entities/Endereco";

export default interface InterfaceAbrigoRepository {
    criaAbrigo(abrigo: AbrigoEntity): void | Promise<void>;

    listaAbrigos(): AbrigoEntity[] | Promise<AbrigoEntity[]>;

    atualizaAbrigo(id: number, abrigo: AbrigoEntity): void;

    deletaAbrigo(id: number): void;

    atualizaEnderecoAdotante(idAbrigo: number, endereco: EnderecoEntity): void;
}