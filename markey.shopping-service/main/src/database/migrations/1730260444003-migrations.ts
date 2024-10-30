import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730260444003 implements MigrationInterface {
    name = 'Migrations1730260444003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "category" TO "category_id"`);
        await queryRunner.query(`ALTER TYPE "public"."posts_category_enum" RENAME TO "posts_category_id_enum"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "create_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "create_by" character varying`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "update_by" character varying`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "delete_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "category_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_852f266adc5d67c40405c887b49" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_852f266adc5d67c40405c887b49"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "category_id" "public"."posts_category_id_enum" NOT NULL DEFAULT 'OTHER'`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "delete_at"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "update_by"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "create_by"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "create_at"`);
        await queryRunner.query(`ALTER TYPE "public"."posts_category_id_enum" RENAME TO "posts_category_enum"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "category_id" TO "category"`);
    }

}
