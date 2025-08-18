import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TransactionType } from './enums/TransactionType.enum';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'uuid', name: 'id_user' })
  idUser: string;
  @Column({ type: 'integer' })
  value: number;
  @Column({ type: 'date' })
  data: Date;
  @Column()
  category: string;
  @Column({ nullable: true })
  store?: string;
  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  typeTransition: TransactionType;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  static fromCreateDto(dto: CreateTransactionDto): Transaction {
    const entity: Transaction = new Transaction();
    entity.idUser = dto.idUser;
    entity.value = dto.value;
    return entity;
  }
}
