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
import { AtualizaProdutoDTO } from './dto/atualiza-produto-dto';
import { ProdutoService } from './produto.service';
import { ListaProdutoDTO } from './dto/lista-produto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  public async lista(): Promise<ReadonlyArray<ListaProdutoDTO>> {
    return this.produtoService.listaProdutos();
  }

  @Post()
  public async cadastrarProduto(
    @Body() produto: CriaProdutoDTO,
  ): Promise<ListaProdutoDTO> {
    const produtoDTO = await this.produtoService.criaProduto(produto);
    return produtoDTO;
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
