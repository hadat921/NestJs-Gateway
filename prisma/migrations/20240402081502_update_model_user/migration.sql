/*
  Warnings:

  - Changed the type of `numberOfpages` on the `book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "book" DROP COLUMN "numberOfpages",
ADD COLUMN     "numberOfpages" INTEGER NOT NULL;
