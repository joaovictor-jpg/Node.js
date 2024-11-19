import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { AtualizaPedidoDTO } from './dto/atualiza-pedido.dto';
import { AutenticacaoGuard } from '../autenticacao/autenticacao/autenticacao.guard';
import { RequisicaoComUsuario } from '../autenticacao/interface/interface-com-usuario';

@Controller('pedidos')
@UseGuards(AutenticacaoGuard)
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async create(
    @Req() req: RequisicaoComUsuario,
    @Body() dadosDoPedido: CreatePedidoDto,
  ) {
    const usuarioId = req.usuario.sub;
    const pedido = await this.pedidoService.create(usuarioId, dadosDoPedido);
    return pedido;
  }

  // @Get()
  // findAll() {
  //   return this.pedidoService.findAll();
  // }

  @Get()
  obtemPedidosDeUsuario(@Req() req: RequisicaoComUsuario) {
    return this.pedidoService.obtemPedidosDeUsuario(req.usuario.sub);
  }

  @Patch(':id')
  async update(
    @Req() req: RequisicaoComUsuario,
    @Param('id') id: string,
    @Body() updatePedidoDto: AtualizaPedidoDTO,
  ) {
    const pedidoAtualizado = await this.pedidoService.update(
      id,
      req.usuario.sub,
      updatePedidoDto,
    );
    return pedidoAtualizado;
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidoService.remove(+id);
  // }
}
