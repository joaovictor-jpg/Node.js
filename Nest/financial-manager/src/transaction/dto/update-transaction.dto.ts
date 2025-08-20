import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { TransactionType } from '../entities/enums/TransactionType.enum';

export class UpdateTransactionDto {
  @IsString()
  @IsOptional()
  @Matches(/^[0-9]+,[0-9]{2}$/, {
    message: 'O valor deve estar no formato string "100,00".',
  })
  value?: number;
  @IsDateString({}, { message: 'A data deve estar no formato YYYY-MM-DD.' })
  @IsOptional()
  data?: Date;
  @IsString()
  @IsOptional()
  category?: string;
  @IsString()
  @IsOptional()
  store?: string;
  @IsIn([TransactionType.SPENT, TransactionType.PROHIBITED])
  @IsOptional()
  typeTransition?: TransactionType;
}
