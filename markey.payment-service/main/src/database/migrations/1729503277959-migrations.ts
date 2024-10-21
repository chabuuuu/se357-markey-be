import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729503277959 implements MigrationInterface {
  name = 'Migrations1729503277959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" RENAME COLUMN "amount" TO "total"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payments" RENAME COLUMN "total" TO "amount"`);
  }
}
