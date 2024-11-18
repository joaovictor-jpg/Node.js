import { IsInt, IsUUID } from 'class-validator';

export class ItemPedidoDTO {
  @IsUUID()
  pedidoId: string;
  @IsInt()
  quantidade: number;
}
