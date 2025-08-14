import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Livro } from './livro.model';
import { LivrosService } from './livros.service';

type params = {
  id: number;
};

@Controller('livros')
export class LivrosController {
  constructor(private readonly livrosService: LivrosService) {}

  @Get()
  async obterTodos(): Promise<Livro[]> {
    return await this.livrosService.oberTodos();
  }

  @Get(':id')
  async obterUm(@Param() params: params): Promise<Livro | null> {
    return await this.livrosService.obterUm(params.id);
  }

  @Post()
  async criar(@Body() livro: Livro): Promise<void> {
    await this.livrosService.criar(livro);
  }

  @Put()
  async alterar(@Body() livro: Livro): Promise<[number, Livro[]]> {
    return await this.livrosService.alterar(livro);
  }

  @Delete(':id')
  async delete(@Param() params: params): Promise<string> {
    await this.livrosService.delete(params.id);
    return `Livro com ID: ${params.id}, foi removido com sucesso!`;
  }
}
