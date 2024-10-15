import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1728989094734 implements MigrationInterface {
    name = 'Migrations1728989094734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shopping_carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "shopper_id" character varying NOT NULL, CONSTRAINT "PK_7420877774b880a61269dda7e8a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_items" ("shopping_cart_id" uuid NOT NULL, "product_id" character varying NOT NULL, "amount" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_7fd6f476d9d0dfa31a509d70705" PRIMARY KEY ("shopping_cart_id", "product_id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text, "price" integer NOT NULL, "quantity" integer NOT NULL, "picture" text array, "detail" json, "tags" text array, "category_id" uuid, "shop_id" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "picture" text NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shops" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "profile_picture" text, "description" text, "salesman_id" character varying NOT NULL, CONSTRAINT "UQ_2d52eee86e0f4815cdc79df54ac" UNIQUE ("name"), CONSTRAINT "PK_3c6aaa6607d287de99815e60b96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "FK_2e60e7a9f015b9267316c978780" FOREIGN KEY ("shopping_cart_id") REFERENCES "shopping_carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9e952e93f369f16e27dd786c33f" FOREIGN KEY ("shop_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9e952e93f369f16e27dd786c33f"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "FK_2e60e7a9f015b9267316c978780"`);
        await queryRunner.query(`DROP TABLE "shops"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "cart_items"`);
        await queryRunner.query(`DROP TABLE "shopping_carts"`);
    }

}
