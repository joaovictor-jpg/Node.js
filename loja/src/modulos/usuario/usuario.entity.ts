import { PedidoEntity } from '../pedido/pedido.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column({ name: 'nome', length: 100, nullable: false })
  public nome: string;
  @Column({ name: 'email', length: 70, nullable: false, unique: true })
  public email: string;
  @Column({ name: 'senha', length: 255, nullable: false })
  public senha: string;
  @CreateDateColumn({ name: 'created_at' })
  public createdAt: string;
  @UpdateDateColumn({ name: 'update_at' })
  public updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: string;
  @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)
  pedidos: PedidoEntity[];

  constructor(id: string, nome: string, email: string, senha: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }
}
