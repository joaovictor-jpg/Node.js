import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CriaProdutoDTO } from './dto/cria-produto.dto';
import { v4 as uuid } from 'uuid';
import { ListaProdutoDTO } from './dto/lista-produto.dto';
import { NotFoundError } from 'rxjs';

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

  async buscarPorId(id: string): Promise<ListaProdutoDTO> {
    const produto = await this.produtoRepository.findOneBy({ id });

    if (produto === null) {
      throw new NotFoundError('Produto não encontrado');
    }

    return this.tranformaEntotyParaDTO(produto);
  }

  async criaProduto(produtoNovo: CriaProdutoDTO): Promise<ListaProdutoDTO> {
    const produtoEntity = this.transformaDeDTOParaEntity(produtoNovo);
    try {
      await this.produtoRepository.save(produtoEntity);
    } catch (error) {
      console.error(error);
    }
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
    const lista = new ListaProdutoDTO();
    lista.id = produto.id;
    lista.nome = produto.nome;
    lista.caracteristicas = produto.caracteristicas.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ id, produto, ...resto }) => resto,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lista.imagens = produto.imagens.map(({ id, produto, ...resto }) => resto);
    return lista;
  }
}
