import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729582160945 implements MigrationInterface {
    name = 'Migrations1729582160945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "payment_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payment_id"`);
    }

}
