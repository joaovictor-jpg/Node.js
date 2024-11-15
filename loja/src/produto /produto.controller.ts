import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/cria-produto.dto';
import { ProdutoEntity } from './produto.entity';
import { v4 as uuid } from 'uuid';
import { AtualizaProdutoDTO } from './dto/atualiza-produto-dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Get()
  public async lista(): Promise<ReadonlyArray<ProdutoEntity>> {
    return this.produtoRepository.listaProdutor();
  }

  @Post()
  public async cadastrarProduto(
    @Body() produto: CriaProdutoDTO,
  ): Promise<ProdutoEntity> {
    const produtoNovo = new ProdutoEntity(
      uuid(),
      produto.nome,
      produto.valor,
      produto.quantidadeDisponivel,
      produto.descricao,
      produto.categoria,
      produto.dataCriacao,
      produto.dataAtualizacao,
      produto.caracteristicas,
      produto.imagens,
      produto.usuarioId,
    );
    this.produtoRepository.cadastrarProduto(produtoNovo);
    return produtoNovo;
  }

  @Put('/:id')
  public async atualizarProduto(
    @Param('id') id: string,
    @Body() dadosAtualizados: AtualizaProdutoDTO,
  ): Promise<ProdutoEntity> {
    const produto = await this.produtoRepository.atualizaProduto(
      id,
      dadosAtualizados,
    );
    return produto;
  }

  @Delete('/:id')
  public async deletaProduto(@Param('id') id: string) {
    const produtoDeletado = await this.produtoRepository.removerProduto(id);
    return produtoDeletado;
  }
}
