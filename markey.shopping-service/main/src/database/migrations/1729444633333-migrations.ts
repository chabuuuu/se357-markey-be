import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729444633333 implements MigrationInterface {
    name = 'Migrations1729444633333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "rating_average" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "rating_average" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "rating_average" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "rating_average" SET NOT NULL`);
    }

}
