import { PartialType } from '@nestjs/mapped-types';
import { UsuarioDTO } from './cria-usuario.dto';

export class AtualizaUsuarioDTO extends PartialType(UsuarioDTO) {}
