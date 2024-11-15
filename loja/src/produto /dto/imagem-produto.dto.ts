import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ProdutoEntity } from '../produto.entity';

export class ImagemProdutoDTO {
  id: string;
  @IsNotEmpty({ message: 'URL para imagem inválida' })
  @IsUrl()
  url: string;
  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;
  produto: ProdutoEntity;
}
