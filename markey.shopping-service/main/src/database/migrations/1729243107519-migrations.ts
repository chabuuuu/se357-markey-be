import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729243107519 implements MigrationInterface {
    name = 'Migrations1729243107519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_7fd6f476d9d0dfa31a509d70705"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_2e60e7a9f015b9267316c978780" PRIMARY KEY ("shopping_cart_id")`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "product_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_2e60e7a9f015b9267316c978780"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_7fd6f476d9d0dfa31a509d70705" PRIMARY KEY ("shopping_cart_id", "product_id")`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_30e89257a105eab7648a35c7fce" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_30e89257a105eab7648a35c7fce"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_7fd6f476d9d0dfa31a509d70705"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_2e60e7a9f015b9267316c978780" PRIMARY KEY ("shopping_cart_id")`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "product_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "PK_2e60e7a9f015b9267316c978780"`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "PK_7fd6f476d9d0dfa31a509d70705" PRIMARY KEY ("shopping_cart_id", "product_id")`);
    }

}
