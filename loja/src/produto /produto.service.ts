import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async listaProdutos(): Promise<ProdutoEntity[]> {
    return await this.produtoRepository.find();
  }

  async criaProduto(produtoNovo: ProdutoEntity): Promise<void> {
    await this.produtoRepository.save(produtoNovo);
  }

  async atualizaProduito(
    id: string,
    produto: Partial<ProdutoEntity>,
  ): Promise<void> {
    await this.produtoRepository.update(id, produto);
  }

  async deletaUProduto(id: string): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
