import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioDTO } from './dto/cria-usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from './dto/lista-usuario.dto';
import { AtualizaUsuarioDTO } from './dto/atualiza-usuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: UsuarioDTO) {
    const usuarioEntity = new UsuarioEntity(
      uuid(),
      dadosDoUsuario.nome,
      dadosDoUsuario.email,
      dadosDoUsuario.senha,
    );
    this.usuarioRepository.salvar(usuarioEntity);
    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário cadastrado com sucesso',
    };
  }

  @Get()
  async listaUsuario() {
    const usuarios = await this.usuarioRepository.listar();
    const listaDeUsuarios = usuarios.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
    );

    return listaDeUsuarios;
  }

  @Put('/:id')
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() dadosAtualizados: AtualizaUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioRepository.atualizarUsuario(
      id,
      dadosAtualizados,
    );
    return {
      usuario: new ListaUsuarioDTO(
        usuarioAtualizado.id,
        usuarioAtualizado.nome,
      ),
      message: 'Usuário atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async deletarUsuario(@Param('id') id: string) {
    const usuarioDeletado = await this.usuarioRepository.deletaUsuario(id);

    return {
      'Usuario Deletado': new ListaUsuarioDTO(
        usuarioDeletado.id,
        usuarioDeletado.nome,
      ),
      message: 'Usuário deletado com sucesso',
    };
  }
}
