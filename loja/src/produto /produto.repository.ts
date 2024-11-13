import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoRepository {
  private listaDeProdutos = [];

  public async cadastrarProduto(produto: any): Promise<void> {
    this.listaDeProdutos.push(produto);
  }

  public async listaProdutor(): Promise<ReadonlyArray<any>> {
    return this.listaDeProdutos;
  }
}
