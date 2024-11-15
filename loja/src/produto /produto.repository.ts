import { Injectable } from '@nestjs/common';
import { ProdutoEntity } from './produto.entity';

@Injectable()
export class ProdutoRepository {
  private listaDeProdutos: ProdutoEntity[] = [];

  public async cadastrarProduto(produto: ProdutoEntity): Promise<void> {
    this.listaDeProdutos.push(produto);
  }

  public async listaProdutor(): Promise<ReadonlyArray<any>> {
    return this.listaDeProdutos;
  }

  public async atualizaProduto(
    id: string,
    produtoAtualizado: Partial<ProdutoEntity>,
  ) {
    const produto = await this.buscarPorId(id);

    Object.entries(produtoAtualizado).forEach(([chave, valor]) => {
      if (chave === id) return;
      if (chave === 'usuarioId') return;

      produto[chave] = valor;
    });

    return produto;
  }

  public async removerProduto(id: string) {
    const produtoDelete = await this.buscarPorId(id);

    this.listaDeProdutos = this.listaDeProdutos.filter(
      (produto) => produto.id !== id,
    );

    return produtoDelete;
  }

  private async buscarPorId(id: string) {
    const produto = this.listaDeProdutos.find((produto) => produto.id === id);

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    return produto;
  }
}
