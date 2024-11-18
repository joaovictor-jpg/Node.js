import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { ItemPedidoEntity } from './item-pedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { AtualizaPedidoDTO } from './dto/atualiza-pedido.dto';
@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async create(usuarioId: string, dadosPedidos: CreatePedidoDto) {
    const usuario = await this.buscaUsuario(usuarioId);
    const pedido = new PedidoEntity();

    const produtoIds = dadosPedidos.itensPedido.map(
      (itemPedido) => itemPedido.pedidoId,
    );

    const produtos = await this.produtoRepository.findBy({
      id: In(produtoIds),
    });

    pedido.status = StatusPedido.EM_PROCESSAMENTO;
    pedido.usuario = usuario;

    this.tratarDadosDoPedido(dadosPedidos, produtos);

    const itensPedidoEntity = dadosPedidos.itensPedido.map((itemPedido) => {
      const produtoRelacionado = produtos.find(
        (produto) => produto.id === itemPedido.pedidoId,
      );

      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.produtos = produtoRelacionado!;
      itemPedidoEntity.precoVenca = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade;
      itemPedidoEntity.produtos.quantidadeDisponivel -= itemPedido.quantidade;
      return itemPedidoEntity;
    });

    const valorTotal = itensPedidoEntity.reduce((total, item) => {
      return total + item.precoVenca * item.quantidade;
    }, 0);

    pedido.itensPedidos = itensPedidoEntity;
    pedido.valorTotal = valorTotal;

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

  async update(id: string, updatePedidoDto: AtualizaPedidoDTO) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    if (pedido === null) {
      throw new NotFoundException('O pedido não foi encontrado.');
    }

    Object.assign(pedido, updatePedidoDto);

    return this.pedidoRepository.save(pedido);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} pedido`;
  // }

  private async buscaUsuario(id: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (usuario === null) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return usuario;
  }

  private tratarDadosDoPedido(
    dadosPedidos: CreatePedidoDto,
    produtos: ProdutoEntity[],
  ) {
    dadosPedidos.itensPedido.forEach((itemPedido) => {
      const produto = produtos.find(
        (produto) => produto.id === itemPedido.pedidoId,
      );

      if (produto === undefined) {
        throw new NotFoundException(
          `O produto com id: ${itemPedido.pedidoId}, não foi encontrado`,
        );
      }

      if (itemPedido.quantidade > produto.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponível (${produto.quantidadeDisponivel}) para o produto ${produto.nome}.`,
        );
      }
    });
  }
}
