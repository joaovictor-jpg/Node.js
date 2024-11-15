import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './caracteristicas-produtos.dto';
import { ImagemProdutoDTO } from './imagem-produto.dto';

export class AtualizaProdutoDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  @IsOptional()
  nome: string;
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsPositive({ message: 'O valor precisa ser maior que zero' })
  @IsNotEmpty()
  @IsOptional()
  valor: number;
  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  @IsNotEmpty()
  @IsOptional()
  quantidadeDisponivel: number;
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  @IsOptional()
  descricao: string;
  @ValidateNested()
  @IsArray()
  @Type(() => CaracteristicaProdutoDTO)
  @IsOptional()
  caracteristicas: CaracteristicaProdutoDTO[];
  @ValidateNested()
  @IsArray()
  @Type(() => ImagemProdutoDTO)
  @IsOptional()
  imagens: ImagemProdutoDTO[];
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  categoria: string;
  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  dataCriacao: Date;
  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  dataAtualizacao: Date;
}
