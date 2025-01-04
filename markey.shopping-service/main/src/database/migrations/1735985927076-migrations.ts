import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1735985927076 implements MigrationInterface {
  name = 'Migrations1735985927076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recommends" ("user_id" character varying NOT NULL, "products" text, CONSTRAINT "PK_e965f0efcfd796d079a7ab36afd" PRIMARY KEY ("user_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "recommends"`);
  }
}
