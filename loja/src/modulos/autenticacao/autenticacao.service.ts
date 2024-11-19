import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { UsuarioPayloadI } from './interface/interface-usuario-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtServices: JwtService,
  ) {}

  async login(senhaInserida: string, email: string) {
    const usuario = await this.usuarioService.buscarPorEmail(email);

    const usuarioFoiAutenticado = await bcrypt.compare(
      senhaInserida,
      usuario.senha,
    );

    if (!usuarioFoiAutenticado) {
      throw new UnauthorizedException('O email ou a senha está incorreto.');
    }

    const payload: UsuarioPayloadI = {
      sub: usuario.id,
      nameUsuario: usuario.nome,
    };

    return {
      token_acesso: await this.jwtServices.signAsync(payload),
    };
  }
}
