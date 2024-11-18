import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ItemPedidoDTO } from './item-pedido.dto';

export class CreatePedidoDto {
  @ValidateNested()
  @IsArray()
  @Type(() => ItemPedidoDTO)
  itensPedido: ItemPedidoDTO[];
}
