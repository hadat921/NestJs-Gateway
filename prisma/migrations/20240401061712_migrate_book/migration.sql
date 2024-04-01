/*
  Warnings:

  - You are about to drop the column `userId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `bookId` on the `user` table. All the data in the column will be lost.
  - Added the required column `creator_id` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_bookId_fkey";

-- DropIndex
DROP INDEX "book_userId_key";

-- AlterTable
ALTER TABLE "book" DROP COLUMN "userId",
ADD COLUMN     "creator_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "bookId";

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
