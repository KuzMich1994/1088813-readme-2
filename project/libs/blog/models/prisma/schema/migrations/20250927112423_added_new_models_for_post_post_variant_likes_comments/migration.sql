/*
  Warnings:

  - You are about to drop the column `user_id` on the `posts` table. All the data in the column will be lost.
  - Added the required column `state` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PostState" AS ENUM ('draft', 'published');

-- AlterTable
ALTER TABLE "public"."posts" DROP COLUMN "user_id",
ADD COLUMN     "original_author_id" TEXT,
ADD COLUMN     "original_post_id" TEXT,
ADD COLUMN     "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "repost_created_at" TIMESTAMP(3),
ADD COLUMN     "state" "public"."PostState" NOT NULL;

-- CreateTable
CREATE TABLE "public"."comments" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."likes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."text_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "text_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."video_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "video_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quote_posts" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "quote_author" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "quote_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."photo_posts" (
    "id" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "photo_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."link_posts" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "link_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "comments_post_id_idx" ON "public"."comments"("post_id");

-- CreateIndex
CREATE INDEX "likes_user_id_idx" ON "public"."likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_post_id_key" ON "public"."likes"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "text_posts_post_id_key" ON "public"."text_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "video_posts_post_id_key" ON "public"."video_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "quote_posts_post_id_key" ON "public"."quote_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "photo_posts_post_id_key" ON "public"."photo_posts"("post_id");

-- CreateIndex
CREATE UNIQUE INDEX "link_posts_post_id_key" ON "public"."link_posts"("post_id");

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."likes" ADD CONSTRAINT "likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."text_posts" ADD CONSTRAINT "text_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."video_posts" ADD CONSTRAINT "video_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quote_posts" ADD CONSTRAINT "quote_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."photo_posts" ADD CONSTRAINT "photo_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."link_posts" ADD CONSTRAINT "link_posts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
