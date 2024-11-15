import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730295839833 implements MigrationInterface {
    name = 'Migrations1730295839833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "title" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
    }

}
