import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;
  @Column({ name: 'valor', nullable: false })
  valor: number;
  @Column({ name: 'quantidade', nullable: false })
  quantidadeDisponivel: number;
  @Column({ name: 'descricao', length: 250, nullable: false })
  descricao: string;
  @Column({ name: 'categoria', length: 250, nullable: false })
  categoria: string;
  @Column({ name: 'usuario_id', length: 100, nullable: false })
  usuarioId: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
  // caracteristicas: CaracteristicaProdutoDTO[];
  // imagens: ImagemProdutoDTO[];

  constructor(
    id: string,
    nome: string,
    valor: number,
    quantidadeDisponivel: number,
    descricao: string,
    categoria: string,
    usuarioId: string,
  ) {
    this.id = id;
    this.nome = nome;
    this.valor = valor;
    this.quantidadeDisponivel = quantidadeDisponivel;
    this.descricao = descricao;
    this.categoria = categoria;
    this.usuarioId = usuarioId;
  }
}
