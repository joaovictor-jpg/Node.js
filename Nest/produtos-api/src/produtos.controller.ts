import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Produto } from './produto.model';

type params = {
  id: number;
};

@Controller('produtos')
export class ProdutosController {
  private readonly produtos: Produto[] = [
    new Produto('Liv001', 'Livro de NestJS', 29.9),
    new Produto('Liv002', 'Livro de Angular', 39.9),
    new Produto('Liv003', 'Livro de React', 49.9),
    new Produto('Liv004', 'Livro de Vue.js', 59.9),
  ];

  @Get()
  obterTodos(): Produto[] {
    return this.produtos;
  }

  @Get(':id')
  obterUm(): Produto {
    return this.produtos[0];
  }

  @Post()
  criar(@Body() produto: Produto): void {
    produto.setId(100);
    this.produtos.push(produto);
  }

  @Put()
  aalterar(@Body() produto: Produto): Produto {
    return produto;
  }

  @Delete(':id')
  delete(@Param() params: params): string {
    this.produtos.pop();
    return `Produto com ID: ${params.id}, foi removido com sucesso!`;
  }
}
