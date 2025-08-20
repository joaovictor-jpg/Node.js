import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOperator,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from './entities/enums/TransactionType.enum';
import { Transaction } from './entities/transaction.entity';
import { Where } from './types/Where';
import { Filters } from './types/filters';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const newTransaction =
      this.transactionRepository.create(createTransactionDto);
    return this.transactionRepository.save(newTransaction);
  }

  async findAll(idUser: string, filters: Filters): Promise<Transaction[]> {
    const where = this.buildWhereClause(idUser, filters);
    return this.transactionRepository.find({ where });
  }

  async getSummary(idUser: string, filters: Filters): Promise<any> {
    const where = this.buildWhereClause(idUser, filters);
    const transactions = await this.transactionRepository.find({ where });

    let totalEntradas = 0;
    let totalGastos = 0;

    transactions.forEach((t) => {
      if (t.typeTransition === TransactionType.SPENT) {
        totalGastos += t.value;
      } else if (t.typeTransition === TransactionType.PROHIBITED) {
        totalEntradas += t.value;
      }
    });

    const result = totalEntradas - totalGastos;

    return {
      result: this.formatIntToCurrencyString(result),
      totalEntradas: this.formatIntToCurrencyString(totalEntradas),
      totalGastos: this.formatIntToCurrencyString(totalGastos),
      numero_de_transacoes: transactions.length,
    };
  }

  private buildWhereClause(idUser: string, filters: Filters): Where {
    const { start_date, end_date, category, minimum_value, maximum_value } =
      filters;

    const startDate = start_date
      ? new Date(start_date)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    let endDate: Date;

    if (end_date) {
      endDate = new Date(end_date);
    } else {
      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 30);
    }

    let valueF: number | FindOperator<number> | undefined;

    if (minimum_value && maximum_value) {
      valueF = Between(minimum_value, maximum_value);
    } else if (minimum_value) {
      valueF = MoreThanOrEqual(minimum_value);
    } else if (maximum_value) {
      valueF = LessThanOrEqual(maximum_value);
    }

    const where: Where = {
      idUser: idUser,
      data: Between(startDate, endDate),
      category: category,
      value: valueF,
    };

    return where;
  }

  async update(
    idUser: string,
    updateDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.transactionRepository.preload({
      idUser,
      ...updateDto,
    });

    if (!transaction) {
      throw new Error(`Transação com ID ${idUser} não encontrada.`);
    }
    return this.transactionRepository.save(transaction);
  }

  async remove(idUser: string): Promise<void> {
    const result = await this.transactionRepository.delete(idUser);
    if (result.affected === 0) {
      throw new Error(`Transação com ID ${idUser} não encontrada.`);
    }
  }

  private formatIntToCurrencyString(value: number): string {
    const cents = value % 100;
    const real = Math.floor(value / 100);
    return `${real},${cents.toString().padStart(2, '0')}`;
  }
}
