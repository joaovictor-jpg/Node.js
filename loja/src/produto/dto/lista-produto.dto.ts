import { PickType } from '@nestjs/mapped-types';
import { ProdutoEntity } from '../produto.entity';
import { ListaImagensDTO } from './lista-imagens.dto';
import { ListaCaracteristicasProdutosDTO } from './lista-caracteristicas.dto';

export class ListaProdutoDTO extends PickType(ProdutoEntity, ['id', 'nome']) {
  caracteristicas: ListaCaracteristicasProdutosDTO[];
  imagens: ListaImagensDTO[];
}
