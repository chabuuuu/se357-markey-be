import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729492934384 implements MigrationInterface {
    name = 'Migrations1729492934384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "order_item_order_id_product_id_unique" ON "order_items" ("order_id", "product_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."order_item_order_id_product_id_unique"`);
    }

}
