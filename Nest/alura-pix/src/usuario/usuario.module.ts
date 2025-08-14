import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { IsNomeDeUsuarioUnicoConstraint } from './dto/is-nome-de-usuario-único.validator';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, IsNomeDeUsuarioUnicoConstraint],
})
export class UsuarioModule {}
