import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  private readonly usuarios: Usuario[] = [];
  create(createUsuarioDto: CreateUsuarioDto): CreateUsuarioDto {
    this.usuarios.push(createUsuarioDto.createUser());
    return createUsuarioDto;
  }

  findAll() {
    return `This action returns all usuario`;
  }

  findByName(nomeDeUsuario: string): Usuario {
    const usuario = this.usuarios.find(
      (usuario) =>
        usuario.nomeDeUsuario.toLowerCase() === nomeDeUsuario.toLowerCase(),
    );

    if (usuario === undefined || usuario === null) {
      throw new Error('Usuário não encontrado');
    }

    return usuario;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
