import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { StatusPedido } from './enum/status-pedido.enum';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(usuarioId: string) {
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    const pedido = new PedidoEntity();

    pedido.valorTotal = 0.0;
    pedido.status = StatusPedido.EM_PROCESSAMENTO;
    pedido.usuario = usuario;

    const pedidoCriado = await this.pedidoRepository.save(pedido);

    return pedidoCriado;
  }

  // findAll() {
  //   return `This action returns all pedido`;
  // }

  async obtemPedidosDeUsuario(usuarioId: string) {
    return await this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      relations: {
        usuario: true,
      },
    });
  }

  // update(id: number, updatePedidoDto: UpdatePedidoDto) {
  //   return `This action updates a #${id} pedido`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} pedido`;
  // }
}
