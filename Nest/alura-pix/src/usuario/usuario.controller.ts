import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UsuarioService } from './usuario.service';
import { NestResponseBuilder } from 'src/core/http/nest-response.builder';

@Controller('users')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const usuarioCriado = this.usuarioService.create(createUsuarioDto);
    return new NestResponseBuilder()
      .comStatus(HttpStatus.CREATED)
      .comHeader({
        location: `/users/${usuarioCriado.nomeDeUsuario}`,
      })
      .comBody(usuarioCriado)
      .builder();
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':nomeDeUsuario')
  findByName(@Param('nomeDeUsuario') nomeDeUsuario: string): Usuario {
    const usuarioEncontrado = this.usuarioService.findByName(nomeDeUsuario);
    if (!usuarioEncontrado) {
      throw new Error('Usuário não encontrado');
    }

    return usuarioEncontrado;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
