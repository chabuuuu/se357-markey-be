import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730568614855 implements MigrationInterface {
  name = 'Migrations1730568614855';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."shoppers_gender_enum" AS ENUM('Nam', 'Nữ', 'Khác')`);
    await queryRunner.query(
      `ALTER TABLE "shoppers" ADD "gender" "public"."shoppers_gender_enum" NOT NULL DEFAULT 'Khác'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "shops" DROP COLUMN "salesman_id"`);
    await queryRunner.query(`ALTER TABLE "shops" ADD "salesman_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "shops" ADD CONSTRAINT "REL_a9722eddad7cc66b47343bbe84" UNIQUE ("salesman_id")`
    );
    await queryRunner.query(`ALTER TABLE "shoppers" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "public"."shoppers_gender_enum"`);
  }
}
