import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { ListaUsuarioDTO } from './dto/lista-usuario.dto';

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

  async criaUsuario(usuarioEntity: UsuarioEntity): Promise<void> {
    this.usuarioRepository.save(usuarioEntity);
  }

  async atualizaUsuario(
    id: string,
    dadosUsuario: Partial<UsuarioEntity>,
  ): Promise<void> {
    await this.usuarioRepository.update(id, dadosUsuario);
  }

  async deletaUsuario(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
