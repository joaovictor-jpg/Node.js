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
import { ProdutosService } from './produtos.service';

type params = {
  id: number;
};

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  obterTodos(): Produto[] {
    return this.produtosService.oberTodos();
  }

  @Get(':id')
  obterUm(): Produto {
    return this.produtosService.obterUm(1);
  }

  @Post()
  criar(@Body() produto: Produto): void {
    this.produtosService.criar(produto);
  }

  @Put()
  aalterar(@Body() produto: Produto): Produto {
    return this.produtosService.alterar(produto);
  }

  @Delete(':id')
  delete(@Param() params: params): string {
    this.produtosService.delete(params.id);
    return `Produto com ID: ${params.id}, foi removido com sucesso!`;
  }
}
