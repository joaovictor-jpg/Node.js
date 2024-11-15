import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CriaProdutoDTO } from './dto/cria-produto.dto';
import { ProdutoEntity } from './produto.entity';
import { v4 as uuid } from 'uuid';
import { AtualizaProdutoDTO } from './dto/atualiza-produto-dto';
import { ProdutoService } from './produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  public async lista(): Promise<ReadonlyArray<ProdutoEntity>> {
    return this.produtoService.listaProdutos();
  }

  @Post()
  public async cadastrarProduto(
    @Body() produto: CriaProdutoDTO,
  ): Promise<ProdutoEntity> {
    const produtoNovo = new ProdutoEntity();

    produtoNovo.id = uuid();
    produtoNovo.nome = produto.nome;
    produtoNovo.usuarioId = produto.usuarioId;
    produtoNovo.valor = produto.valor;
    produtoNovo.quantidadeDisponivel = produto.quantidadeDisponivel;
    produtoNovo.descricao = produto.descricao;
    produtoNovo.categoria = produto.categoria;
    produtoNovo.caracteristicas = produto.caracteristicas;
    produtoNovo.imagens = produto.imagens;

    this.produtoService.criaProduto(produtoNovo);
    return produtoNovo;
  }

  @Put('/:id')
  public async atualizarProduto(
    @Param('id') id: string,
    @Body() dadosAtualizados: AtualizaProdutoDTO,
  ): Promise<string> {
    await this.produtoService.atualizaProduito(id, dadosAtualizados);
    return `Produto com id: ${id}, foi atualizado com sucesso`;
  }

  @Delete('/:id')
  public async deletaProduto(@Param('id') id: string): Promise<any> {
    await this.produtoService.deletaUProduto(id);
    return {
      messagem: `Produto com id: ${id}, foi deletado com sucesso`,
    };
  }
}
