import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Livro extends Model<Livro> {
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  private codigo: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  private nome: string;
  @Column({
    type: DataType.DECIMAL(10, 5),
    allowNull: false,
  })
  private preco: number;
}
