import EnumEspecie from "../enum/EnumEspecies";

type TipoPet = {
    id: number,
    nome: string,
    especie: EnumEspecie,
    adotado: boolean;
    dataDeNascimento: Date;
}

export default TipoPet;