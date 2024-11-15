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
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private usuarioService: UsuarioService,
  ) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: UsuarioDTO) {
    const usuarioEntity = new UsuarioEntity(
      uuid(),
      dadosDoUsuario.nome,
      dadosDoUsuario.email,
      dadosDoUsuario.senha,
    );
    this.usuarioService.criaUsuario(usuarioEntity);
    return {
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário cadastrado com sucesso',
    };
  }

  @Get()
  async listaUsuario(): Promise<ListaUsuarioDTO[]> {
    const usuarios = await this.usuarioService.listaUsuario();

    return usuarios;
  }

  @Put('/:id')
  async atualizarUsuario(
    @Param('id') id: string,
    @Body() dadosAtualizados: AtualizaUsuarioDTO,
  ) {
    await this.usuarioService.atualizaUsuario(id, dadosAtualizados);
    return {
      usuario: new ListaUsuarioDTO(id, dadosAtualizados.nome),
      message: 'Usuário atualizado com sucesso!',
    };
  }

  @Delete('/:id')
  async deletarUsuario(@Param('id') id: string) {
    await this.usuarioService.deletaUsuario(id);

    return { message: 'Usuário deletado com sucesso' };
  }
}
