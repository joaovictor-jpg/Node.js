import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../entities/enums/TransactionType.enum';

export class CreateTransactionDto {
  @IsUUID()
  @IsNotEmpty({ message: 'the id_user is required' })
  idUser: string;
  @IsString()
  @IsNotEmpty({ message: 'The value is required.' })
  value: number;
  @IsDateString({}, { message: 'The date must be in the format YYYY-MM-DD.' })
  @IsNotEmpty({ message: 'The date is mandatory.' })
  data: Date;
  @IsString()
  @IsNotEmpty({ message: 'Category is required.' })
  category: string;
  @IsString()
  @IsOptional()
  store?: string;
  @IsIn([TransactionType.SPENT, TransactionType.PROHIBITED])
  @IsNotEmpty({ message: 'Type is mandatory (SPENT or PROHIBITED).' })
  typeTransition: TransactionType;
}
