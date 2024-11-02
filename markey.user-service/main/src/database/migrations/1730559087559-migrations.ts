import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730559087559 implements MigrationInterface {
  name = 'Migrations1730559087559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shops" DROP CONSTRAINT "FK_a9722eddad7cc66b47343bbe848"`);
    await queryRunner.query(`ALTER TABLE "salesmans" ALTER COLUMN "address" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "salesmans" ALTER COLUMN "birthdate" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "salesmans" ALTER COLUMN "cccd" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "shoppers" ALTER COLUMN "username" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "shoppers" ALTER COLUMN "address" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "shoppers" ALTER COLUMN "birthdate" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shoppers" ALTER COLUMN "birthdate" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "shoppers" ALTER COLUMN "address" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "shoppers" ALTER COLUMN "username" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "shops" DROP COLUMN "salesman_id"`);
    await queryRunner.query(`ALTER TABLE "shops" ADD "salesman_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "shops" ADD CONSTRAINT "REL_a9722eddad7cc66b47343bbe84" UNIQUE ("salesman_id")`
    );
    await queryRunner.query(`ALTER TABLE "salesmans" ALTER COLUMN "cccd" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "salesmans" ALTER COLUMN "birthdate" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "salesmans" ALTER COLUMN "address" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "shops" ADD CONSTRAINT "FK_a9722eddad7cc66b47343bbe848" FOREIGN KEY ("salesman_id") REFERENCES "salesmans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
