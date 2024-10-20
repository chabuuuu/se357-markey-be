import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729444014990 implements MigrationInterface {
    name = 'Migrations1729444014990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "rating_average" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "rating_average" SET DEFAULT '1'`);
    }

}
