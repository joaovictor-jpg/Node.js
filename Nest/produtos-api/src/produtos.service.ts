import { Produto } from './produto.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutosService {
  private readonly produtos: Produto[] = [
    new Produto('Liv001', 'Livro de NestJS', 29.9),
    new Produto('Liv002', 'Livro de Angular', 39.9),
    new Produto('Liv003', 'Livro de React', 49.9),
    new Produto('Liv004', 'Livro de Vue.js', 59.9),
  ];

  oberTodos(): Produto[] {
    return this.produtos;
  }

  obterUm(id: number): Produto {
    return this.produtos[0];
  }

  criar(produto: Produto): void {
    this.produtos.push(produto);
  }

  alterar(produto: Produto): Produto {
    return produto;
  }

  delete(id: number): void {
    this.produtos.pop();
  }
}
