import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729244186822 implements MigrationInterface {
    name = 'Migrations1729244186822'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_ratings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "rating" integer NOT NULL, "comment" character varying(250), "product_id" uuid NOT NULL, "shopper_id" character varying NOT NULL, CONSTRAINT "CHK_34ce7a506fd78e4865491cf105" CHECK ("rating" >= 1 AND "rating" <= 5), CONSTRAINT "PK_f8bd94404fc1d160bdb075dc435" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5ba0b5cedf17a25b93dd188278" ON "product_ratings" ("shopper_id", "product_id") `);
        await queryRunner.query(`ALTER TABLE "product_ratings" ADD CONSTRAINT "FK_538c9489e98d4874e8db0c4cafd" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_ratings" DROP CONSTRAINT "FK_538c9489e98d4874e8db0c4cafd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5ba0b5cedf17a25b93dd188278"`);
        await queryRunner.query(`DROP TABLE "product_ratings"`);
    }

}
