import { info } from 'node:console';
import { Livro } from './livro.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LivrosService {
  private readonly livros: Livro[] = [];

  oberTodos(): Livro[] {
    return this.livros;
  }

  obterUm(id: number): Livro {
    return this.livros[id];
  }

  criar(livros: Livro): void {
    this.livros.push(livros);
  }

  alterar(livros: Livro): Livro {
    return livros;
  }

  delete(id: number): void {
    info(id);
    this.livros.pop();
  }
}
