import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuarioRepository {
  private usuarios = [];

  public async salvar(usuario) {
    this.usuarios.push(usuario);
  }

  public async listar() {
    return this.usuarios;
  }

  public async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      (usuario) => usuario.email === email,
    );
    return possivelUsuario !== undefined;
  }
}
