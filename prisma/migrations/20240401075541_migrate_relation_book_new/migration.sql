/*
  Warnings:

  - You are about to drop the column `updater_id` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "book" DROP CONSTRAINT "book_updater_id_fkey";

-- AlterTable
ALTER TABLE "book" DROP COLUMN "updater_id",
ADD COLUMN     "updater_id_" INTEGER;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_updater_id__fkey" FOREIGN KEY ("updater_id_") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
