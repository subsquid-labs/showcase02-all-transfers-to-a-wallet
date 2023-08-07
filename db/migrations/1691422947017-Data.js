module.exports = class Data1691422947017 {
    name = 'Data1691422947017'

    async up(db) {
        await db.query(`CREATE TABLE "transfer_to_vitalik" ("id" character varying NOT NULL, "block" integer NOT NULL, "contract" text NOT NULL, "from" text NOT NULL, "value" numeric NOT NULL, CONSTRAINT "PK_5c7431326706e2e735a81d61905" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_efdf9c9b0aa81d3bc96fa5e381" ON "transfer_to_vitalik" ("block") `)
        await db.query(`CREATE INDEX "IDX_cd7a9a4099561e71eafcfa86ee" ON "transfer_to_vitalik" ("contract") `)
        await db.query(`CREATE INDEX "IDX_b04a86d2e001c80e82ed30816b" ON "transfer_to_vitalik" ("from") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "transfer_to_vitalik"`)
        await db.query(`DROP INDEX "public"."IDX_efdf9c9b0aa81d3bc96fa5e381"`)
        await db.query(`DROP INDEX "public"."IDX_cd7a9a4099561e71eafcfa86ee"`)
        await db.query(`DROP INDEX "public"."IDX_b04a86d2e001c80e82ed30816b"`)
    }
}
