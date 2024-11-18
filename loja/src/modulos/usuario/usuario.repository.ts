import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  public async salvar(usuario: UsuarioEntity) {
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

  public async atualizarUsuario(
    id: string,
    dadosDeAtualizacao: Partial<UsuarioEntity>,
  ) {
    const usuario = this.buscaPorId(id);

    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if (chave === id) return;

      usuario[chave] = valor;
    });
    return usuario;
  }

  async deletaUsuario(id: string) {
    const usuario = this.buscaPorId(id);
    this.usuarios = this.usuarios.filter((usuarioOld) => usuarioOld.id !== id);
    return usuario;
  }

  private buscaPorId(id: string) {
    const possivelUsuario = this.usuarios.find((usuario) => usuario.id === id);

    if (!possivelUsuario) {
      throw new Error('Usuário não existe');
    }

    return possivelUsuario;
  }
}
