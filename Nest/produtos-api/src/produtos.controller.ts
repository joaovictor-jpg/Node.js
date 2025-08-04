import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('produtos')
export class ProdutosController {
  @Get()
  obterTodos(): string {
    return 'Lista produtos';
  }

  @Get(':id')
  obterUm(@Param() params): string {
    return `Retorna os dados do produto ${params.id}`;
  }

  @Post()
  criar(@Body() produto): string {
    console.log(produto);
    return 'Produto criado';
  }

  @Put()
  aalterar(@Body() produto): string {
    console.log(produto);
    return 'Produto alterado com sucesso';
  }

  @Delete(':id')
  delete(@Param() params): string {
    return `Apaga o produto - ${params.id}`;
  }
}
