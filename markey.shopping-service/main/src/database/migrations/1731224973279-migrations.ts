import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731224973279 implements MigrationInterface {
    name = 'Migrations1731224973279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_ratings" ADD "shopper" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_ratings" DROP COLUMN "shopper"`);
    }

}
