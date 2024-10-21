import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729503079972 implements MigrationInterface {
  name = 'Migrations1729503079972';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" ADD "order" jsonb NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "order"`);
  }
}
