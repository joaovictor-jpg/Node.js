import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import type { Filters } from './types/filters';
import { ParseCurrencyPipe } from './Interceptors/parse-currency.pipe';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body(ParseCurrencyPipe) createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get(':idUser')
  async findAll(
    @Param('idUser', ParseUUIDPipe) idUser: string,
    @Query(ParseCurrencyPipe) filters: Filters,
  ) {
    return await this.transactionService.findAll(idUser, filters);
  }
}
