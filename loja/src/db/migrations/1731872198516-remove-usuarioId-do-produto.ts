import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUsuarioIdDoProduto1731872198516
  implements MigrationInterface
{
  name = 'RemoveUsuarioIdDoProduto1731872198516';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuario_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD "usuario_id" character varying(100) NOT NULL`,
    );
  }
}
