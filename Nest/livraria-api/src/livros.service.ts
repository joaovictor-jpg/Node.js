import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Livro } from './livro.model';

@Injectable()
export class LivrosService {
  constructor(
    @InjectModel(Livro)
    private livroModel: typeof Livro,
  ) {}

  async oberTodos(): Promise<Livro[]> {
    return await this.livroModel.findAll();
  }

  async obterUm(id: number): Promise<Livro | null> {
    return await this.livroModel.findByPk(id);
  }

  async criar(livro: Livro): Promise<void> {
    await this.livroModel.create(livro);
  }

  async alterar(livro: Livro): Promise<[number, Livro[]]> {
    return await this.livroModel.update(livro, {
      where: {
        id: livro.id,
      },
      returning: true,
    });
  }

  async delete(id: number): Promise<void> {
    const livro: Livro | null = await this.obterUm(id);
    if (livro !== null) {
      await livro.destroy();
    }
  }
}
