import { Controller, Post, Param, Get, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post(':id')
  create(@Param('id') usuarioId: string) {
    return this.pedidoService.create(usuarioId);
  }

  // @Get()
  // findAll() {
  //   return this.pedidoService.findAll();
  // }

  @Get(':id')
  obtemPedidosDeUsuario(@Query('id') id: string) {
    return this.pedidoService.obtemPedidosDeUsuario(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
  //   return this.pedidoService.update(+id, updatePedidoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidoService.remove(+id);
  // }
}
