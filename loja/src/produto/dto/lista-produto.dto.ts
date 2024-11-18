import { CaracteristicaProdutoDTO } from './caracteristicas-produtos.dto';
import { ImagemProdutoDTO } from './imagem-produto.dto';

export class ListaProdutoDTO {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly caracteristicas: Omit<
      CaracteristicaProdutoDTO,
      'id' | 'produto'
    >[],
    readonly imagens: Omit<ImagemProdutoDTO, 'id' | 'produto'>[],
  ) {}
}
