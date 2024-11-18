import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CriaProdutoDTO } from './dto/cria-produto.dto';
import { v4 as uuid } from 'uuid';
import { ListaProdutoDTO } from './dto/lista-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async listaProdutos(): Promise<ListaProdutoDTO[]> {
    const produtosEntity = await this.produtoRepository.find();
    return produtosEntity.map((produto) =>
      this.tranformaEntotyParaDTO(produto),
    );
  }

  async criaProduto(produtoNovo: CriaProdutoDTO): Promise<ListaProdutoDTO> {
    const produtoEntity = this.transformaDeDTOParaEntity(produtoNovo);
    await this.produtoRepository.save(produtoEntity);
    return this.tranformaEntotyParaDTO(produtoEntity);
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

  private transformaDeDTOParaEntity(produto: CriaProdutoDTO): ProdutoEntity {
    const produtoNovo = new ProdutoEntity();

    produtoNovo.id = uuid();
    produtoNovo.nome = produto.nome;
    produtoNovo.valor = produto.valor;
    produtoNovo.quantidadeDisponivel = produto.quantidadeDisponivel;
    produtoNovo.descricao = produto.descricao;
    produtoNovo.categoria = produto.categoria;
    produtoNovo.caracteristicas = produto.caracteristicas;
    produtoNovo.imagens = produto.imagens;

    return produtoNovo;
  }

  private tranformaEntotyParaDTO(produto: ProdutoEntity): ListaProdutoDTO {
    return new ListaProdutoDTO(
      produto.id,
      produto.nome,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      produto.caracteristicas.map(({ id, produto, ...resto }) => resto),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      produto.imagens.map(({ id, produto, ...resto }) => resto),
    );
  }
}
