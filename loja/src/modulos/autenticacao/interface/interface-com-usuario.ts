import { Request } from 'express';
import { UsuarioPayloadI } from './interface-usuario-payload';

export interface RequisicaoComUsuario extends Request {
  usuario: UsuarioPayloadI;
}
