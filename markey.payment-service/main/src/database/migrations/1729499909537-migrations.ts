import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729499909537 implements MigrationInterface {
  name = 'Migrations1729499909537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."payments_payment_method_enum" AS ENUM('COD', 'VNPAY')`);
    await queryRunner.query(
      `CREATE TABLE "payments" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_id" character varying NOT NULL, "payment_method" "public"."payments_payment_method_enum" NOT NULL DEFAULT 'COD', "amount" integer NOT NULL, "payment_info" jsonb, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TYPE "public"."payments_payment_method_enum"`);
  }
}
