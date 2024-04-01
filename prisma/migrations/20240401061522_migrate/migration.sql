/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `book` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "book" DROP CONSTRAINT "book_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bookId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "book_userId_key" ON "book"("userId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
