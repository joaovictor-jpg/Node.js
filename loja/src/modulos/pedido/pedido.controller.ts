import {
  Controller,
  Post,
  Param,
  Get,
  Query,
  Body,
  Patch,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { AtualizaPedidoDTO } from './dto/atualiza-pedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post(':id')
  create(
    @Param('id') usuarioId: string,
    @Body() dadosDoPedido: CreatePedidoDto,
  ) {
    const pedido = this.pedidoService.create(usuarioId, dadosDoPedido);
    return pedido;
  }

  // @Get()
  // findAll() {
  //   return this.pedidoService.findAll();
  // }

  @Get(':id')
  obtemPedidosDeUsuario(@Query('id') id: string) {
    return this.pedidoService.obtemPedidosDeUsuario(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePedidoDto: AtualizaPedidoDTO,
  ) {
    const pedidoAtualizado = await this.pedidoService.update(
      id,
      updatePedidoDto,
    );
    return pedidoAtualizado;
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidoService.remove(+id);
  // }
}
