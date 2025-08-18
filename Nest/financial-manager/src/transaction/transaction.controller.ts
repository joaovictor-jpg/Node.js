import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import { Filters } from './types/filters';
import { DecimalFormatInterceptor } from './Interceptors/decimal-format-interceptor';
import { StringFormatInterceptor } from './Interceptors/string-format-interceptor';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @UseInterceptors(StringFormatInterceptor)
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get(':idUser')
  @UseInterceptors(DecimalFormatInterceptor)
  async findAll(
    @Param('idUser', ParseUUIDPipe) idUser: string,
    @Query('start_date') start_date?: Date,
    @Query('end_date') end_date?: Date,
    @Query('category') category?: string,
    @Query('minimum_value') minimum_value?: string,
    @Query('maximum_value') maximum_value?: string,
  ) {
    const filters: Filters = {
      start_date,
      end_date,
      category,
      minimum_value,
      maximum_value,
    };
    return await this.transactionService.findAll(idUser, filters);
  }
}
