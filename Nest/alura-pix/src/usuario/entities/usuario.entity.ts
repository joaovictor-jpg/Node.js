export class Usuario {
  id: number;
  nomeDeUsuario: string;
  email: string;
  senha: string;
  nomeCompleto: string;
  dataEntrada: Date;

  constructor(
    id: number,
    nomeDeUsuario: string,
    email: string,
    senha: string,
    nomeCompleto: string,
    dataEntrada: Date,
  ) {
    this.id = id;
    this.nomeDeUsuario = nomeDeUsuario;
    this.email = email;
    this.senha = senha;
    this.nomeCompleto = nomeCompleto;
    this.dataEntrada = dataEntrada;
  }
}
