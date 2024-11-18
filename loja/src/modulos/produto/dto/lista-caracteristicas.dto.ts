import { PickType } from '@nestjs/mapped-types';
import { ProdutoCarcteristica } from '../produto-caracteristica.entity';

export class ListaCaracteristicasProdutosDTO extends PickType(
  ProdutoCarcteristica,
  ['nome', 'descricao'],
) {}
