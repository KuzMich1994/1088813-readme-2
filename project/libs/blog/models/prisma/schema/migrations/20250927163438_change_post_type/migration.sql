/*
  Warnings:

  - The values [cite] on the enum `PostType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PostType_new" AS ENUM ('video', 'photo', 'text', 'link', 'quote');
ALTER TABLE "public"."posts" ALTER COLUMN "type" TYPE "public"."PostType_new" USING ("type"::text::"public"."PostType_new");
ALTER TYPE "public"."PostType" RENAME TO "PostType_old";
ALTER TYPE "public"."PostType_new" RENAME TO "PostType";
DROP TYPE "public"."PostType_old";
COMMIT;
