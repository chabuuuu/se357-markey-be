import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1731298039832 implements MigrationInterface {
    name = 'Migrations1731298039832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "name_for_search" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "name_for_search"`);
    }

}
