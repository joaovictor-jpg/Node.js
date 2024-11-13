import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutoRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/cria-produto.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private produtoRepository: ProdutoRepository) {}

  @Get()
  public async lista(): Promise<ReadonlyArray<any>> {
    return this.produtoRepository.listaProdutor();
  }

  @Post()
  public async cadastrarProduto(@Body() produto: CriaProdutoDTO): Promise<any> {
    this.produtoRepository.cadastrarProduto(produto);
    return produto;
  }
}
