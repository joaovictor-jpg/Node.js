import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { ListaUsuarioDTO } from './dto/lista-usuario.dto';
import { NotFoundException } from '@nestjs/common';

export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async listaUsuario(): Promise<ListaUsuarioDTO[]> {
    const usuarioSalvo = await this.usuarioRepository.find();
    const usuarioLista = usuarioSalvo.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );
    return usuarioLista;
  }

  async buscarPorEmail(email: string): Promise<UsuarioEntity> {
    const usuario = await this.buscarPorPropriedade('email', email);

    return usuario;
  }

  async criaUsuario(usuarioEntity: UsuarioEntity): Promise<void> {
    await this.usuarioRepository.save(usuarioEntity);
  }

  async atualizaUsuario(
    id: string,
    dadosUsuario: Partial<UsuarioEntity>,
  ): Promise<UsuarioEntity> {
    const usuario = await this.buscarPorPropriedade('id', id);

    Object.assign(usuario, dadosUsuario);

    await this.usuarioRepository.save(usuario);

    return usuario;
  }

  async deletaUsuario(id: string): Promise<void> {
    const usuario = await this.buscarPorPropriedade('id', id);

    await this.usuarioRepository.delete(usuario.id);
  }

  private async buscarPorPropriedade(
    campo: string,
    valor: string,
  ): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOneBy({
      [campo]: valor,
    });

    if (usuario === null) throw new NotFoundException('Usuário não encontrado');

    return usuario;
  }
}
