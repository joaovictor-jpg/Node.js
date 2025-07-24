export default class Customer {
    id: number;
    nome: string;
    cpf: string;

    private static nextId = 1;

    constructor(nome: string, cpf: string) {
        this.id = Customer.nextId++;
        this.nome = nome;
        this.cpf = cpf;
    }
}