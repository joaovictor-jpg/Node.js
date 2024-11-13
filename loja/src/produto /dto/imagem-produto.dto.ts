import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ImagemProdutoDTO {
  @IsNotEmpty({ message: 'URL para imagem inválida' })
  @IsUrl()
  url: string;
  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;
}
