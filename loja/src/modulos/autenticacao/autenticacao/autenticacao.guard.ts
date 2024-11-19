import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsuarioPayloadI } from '../interface/interface-usuario-payload';
import { RequisicaoComUsuario } from '../interface/interface-com-usuario';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requisicao = context
      .switchToHttp()
      .getRequest<RequisicaoComUsuario>();
    const token = this.extrairTokenDoCabecalho(requisicao);

    if (!token) {
      throw new UnauthorizedException('Erro de authenticação');
    }

    try {
      const payload: UsuarioPayloadI = await this.jwtService.verifyAsync(token);
      requisicao.usuario = payload;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('JWT inválido');
    }

    return true;
  }

  private extrairTokenDoCabecalho(requisicao: Request): string | undefined {
    const [tipo, token] = requisicao.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}
