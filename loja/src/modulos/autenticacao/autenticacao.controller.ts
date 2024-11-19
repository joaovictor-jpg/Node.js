import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticaDTO } from './dto/create-autenticacao.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('/login')
  create(@Body() { senha, email }: AutenticaDTO) {
    return this.autenticacaoService.login(senha, email);
  }
}
