import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'produtos_caracteristicas' })
export class ProdutoCarcteristica {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;
  @Column({ name: 'descricao', length: 100, nullable: false })
  descricao: string;
}
