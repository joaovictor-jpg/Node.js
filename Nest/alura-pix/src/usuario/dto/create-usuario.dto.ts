import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Usuario } from '../entities/usuario.entity';
import { IsNomeDeUsuarioUnico } from './is-nome-de-usuario-único.validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateUsuarioDto {
  id: number;
  @Expose({
    name: 'userName',
  })
  @IsNotEmpty({
    message: 'userName is mandatory',
  })
  @IsString({
    message: 'userName precisar ser uma string',
  })
  @IsNomeDeUsuarioUnico({
    message: 'userName needs to be unique',
  })
  nomeDeUsuario: string;
  @IsEmail(
    {},
    {
      message: 'email must be a valid email address',
    },
  )
  email: string;
  @Expose({
    name: 'password',
  })
  @Exclude({
    toPlainOnly: true,
  })
  @IsNotEmpty({
    message: 'password is mandatory',
  })
  senha: string;
  @Expose({
    name: 'fullName',
  })
  @IsNotEmpty({
    message: 'fullName is mandatory',
  })
  nomeCompleto: string;

  createUser(): Usuario {
    return new Usuario(
      this.id,
      this.nomeDeUsuario,
      this.email,
      this.senha,
      this.nomeCompleto,
      new Date(),
    );
  }
}
