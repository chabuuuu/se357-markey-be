import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729246097261 implements MigrationInterface {
    name = 'Migrations1729246097261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."posts_category_enum" AS ENUM('ADVERTISEMENT', 'ANNOUNCEMENT', 'ARTICLE', 'NEWS', 'PROMOTION', 'TUTORIAL', 'OTHER')`);
        await queryRunner.query(`CREATE TYPE "public"."posts_lang_type_enum" AS ENUM('EN', 'VN', 'CN', 'JP', 'KR')`);
        await queryRunner.query(`CREATE TABLE "posts" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "thumbnail" text, "category" "public"."posts_category_enum" NOT NULL DEFAULT 'OTHER', "tags" text array, "content" text NOT NULL, "lang_type" "public"."posts_lang_type_enum" NOT NULL DEFAULT 'VN', "shop_id" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ce7f1bc3839b14612bc250f6015" FOREIGN KEY ("shop_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ce7f1bc3839b14612bc250f6015"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TYPE "public"."posts_lang_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."posts_category_enum"`);
    }

}
