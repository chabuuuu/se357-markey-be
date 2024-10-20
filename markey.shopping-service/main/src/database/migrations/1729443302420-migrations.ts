import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729443302420 implements MigrationInterface {
    name = 'Migrations1729443302420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "rating_average" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ce7f1bc3839b14612bc250f6015"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "shop_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ce7f1bc3839b14612bc250f6015" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ce7f1bc3839b14612bc250f6015"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "shop_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ce7f1bc3839b14612bc250f6015" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "rating_average"`);
    }

}
