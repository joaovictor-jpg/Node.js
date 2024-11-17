import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenomeandoColunaQuantidadeParaQuantidadeDisponivel1731872551531
  implements MigrationInterface
{
  name = 'RenomeandoColunaQuantidadeParaQuantidadeDisponivel1731872551531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" RENAME COLUMN "quantidade" TO "quantidade_disponivel"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" RENAME COLUMN "quantidade_disponivel" TO "quantidade"`,
    );
  }
}
