import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731223325899 implements MigrationInterface {
    name = 'Migrations1731223325899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "shopId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "shopId"`);
    }

}
