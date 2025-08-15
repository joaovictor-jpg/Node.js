import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Usuario } from '../entities/usuario.entity';
import { IsNomeDeUsuarioUnico } from './is-nome-de-usuario-único.validator';

export class CreateUsuarioDto {
  id: number;
  @IsNotEmpty({
    message: 'nomeDeUsuario é obrigatório',
  })
  @IsString({
    message: 'nomeDeUsuario precisar ser uma string',
  })
  @IsNomeDeUsuarioUnico({
    message: 'nomeDeUsuario precisa ser único',
  })
  nomeDeUsuario: string;
  @IsEmail(
    {},
    {
      message: 'email precisa ser um endereço de email válido',
    },
  )
  email: string;
  @IsNotEmpty({
    message: 'Senha é obrigatório',
  })
  senha: string;
  @IsNotEmpty({
    message: 'nomeCompleto é obrigatório',
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
