import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730297686006 implements MigrationInterface {
  name = 'Migrations1730297686006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "salesmans" ADD "is_blocked" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "shoppers" ADD "is_blocked" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shops" DROP COLUMN "salesman_id"`);
    await queryRunner.query(`ALTER TABLE "shops" ADD "salesman_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "shops" ADD CONSTRAINT "REL_a9722eddad7cc66b47343bbe84" UNIQUE ("salesman_id")`
    );
    await queryRunner.query(`ALTER TABLE "shoppers" DROP COLUMN "is_blocked"`);
    await queryRunner.query(`ALTER TABLE "salesmans" DROP COLUMN "is_blocked"`);
    await queryRunner.query(
      `ALTER TABLE "shops" ADD CONSTRAINT "FK_a9722eddad7cc66b47343bbe848" FOREIGN KEY ("salesman_id") REFERENCES "salesmans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
