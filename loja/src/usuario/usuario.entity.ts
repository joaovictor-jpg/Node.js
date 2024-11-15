export class UsuarioEntity {
  constructor(
    private _id: string,
    private _nome: string,
    private _email: string,
    private _senha: string,
  ) {}

  get id(): string {
    return this._id;
  }

  get nome(): string {
    return this._nome;
  }

  get email(): string {
    return this._email;
  }

  set nome(nome: string) {
    this._nome = nome;
  }

  set email(email: string) {
    this._email = email;
  }

  set senha(senha: string) {
    this._senha = senha;
  }
}
