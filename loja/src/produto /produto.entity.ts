import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProdutoCarcteristica } from './produto-caracteristica.entity';
import { ProdutoImagemEntity } from './produto-imagem.entity';

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
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'update_at' })
  updatedAt: string;
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
  @Column({ name: 'usuario_id', length: 100, nullable: false })
  usuarioId: string;
  @OneToMany(
    () => ProdutoCarcteristica,
    (produtoCarcteristica) => produtoCarcteristica.produto,
    { cascade: true, eager: true },
  )
  caracteristicas: ProdutoCarcteristica[];
  @OneToMany(
    () => ProdutoImagemEntity,
    (produtoImagens) => produtoImagens.produto,
    { cascade: true, eager: true },
  )
  imagens: ProdutoImagemEntity[];
}
