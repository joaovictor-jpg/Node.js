export class Produto {
  private id: number;
  private readonly codigo: string;
  private readonly nome: string;
  private readonly preco: number;

  constructor(codigo: string, nome: string, preco: number) {
    this.codigo = codigo;
    this.nome = nome;
    this.preco = preco;
  }

  setId(id: number): void {
    this.id = id;
  }
}
