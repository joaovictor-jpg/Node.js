/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';
import type { Filters } from './types/filters';
import { ParseCurrencyPipe } from './Interceptors/parse-currency.pipe';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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

  @Get('summary/:idUser')
  async getSumary(
    @Param('idUser', ParseUUIDPipe) idUser: string,
    @Query(ParseCurrencyPipe) filters: Filters,
  ) {
    return await this.transactionService.getSummary(idUser, filters);
  }

  @Patch(':idUser')
  async update(
    @Param('idUser', ParseUUIDPipe) idUser: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(idUser, updateTransactionDto);
  }

  @Delete(':idUser')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('idUser', ParseUUIDPipe) id: string) {
    return await this.transactionService.remove(id);
  }
}
