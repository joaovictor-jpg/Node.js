import { CaracteristicaProdutoDTO } from './dto/caracteristicas-produtos.dto';
import { ImagemProdutoDTO } from './dto/imagem-produto.dto';

export class ProdutoEntity {
  constructor(
    public id: string,
    public nome: string,
    public valor: number,
    public quantidadeDisponivel: number,
    public descricao: string,
    public categoria: string,
    public dataCriacao: Date,
    public dataAtualizacao: Date,
    public caracteristicas: CaracteristicaProdutoDTO[],
    public imagens: ImagemProdutoDTO[],
    public usuarioId: string,
  ) {}
}
