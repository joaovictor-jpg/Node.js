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
  obterTodos(): Livro[] {
    return this.livrosService.oberTodos();
  }

  @Get(':id')
  obterUm(): Livro {
    return this.livrosService.obterUm(1);
  }

  @Post()
  criar(@Body() livro: Livro): void {
    this.livrosService.criar(livro);
  }

  @Put()
  aalterar(@Body() livro: Livro): Livro {
    return this.livrosService.alterar(livro);
  }

  @Delete(':id')
  delete(@Param() params: params): string {
    this.livrosService.delete(params.id);
    return `Livro com ID: ${params.id}, foi removido com sucesso!`;
  }
}
