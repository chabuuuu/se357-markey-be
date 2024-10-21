import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729529687412 implements MigrationInterface {
    name = 'Migrations1729529687412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payments_status_enum" AS ENUM('Chưa thanh toán', 'Đã thanh toán')`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "status" "public"."payments_status_enum" NOT NULL DEFAULT 'Chưa thanh toán'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."payments_status_enum"`);
    }

}
