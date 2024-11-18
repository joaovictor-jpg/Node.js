import { PickType } from '@nestjs/mapped-types';
import { ProdutoImagemEntity } from '../produto-imagem.entity';

export class ListaImagensDTO extends PickType(ProdutoImagemEntity, [
  'descricao',
  'url',
]) {}
