/*
  Warnings:

  - You are about to drop the `BookTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookTag" DROP CONSTRAINT "BookTag_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookTag" DROP CONSTRAINT "BookTag_tagId_fkey";

-- DropTable
DROP TABLE "BookTag";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookTag" (
    "bookId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "bookTag_pkey" PRIMARY KEY ("bookId","tagId")
);

-- AddForeignKey
ALTER TABLE "bookTag" ADD CONSTRAINT "bookTag_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookTag" ADD CONSTRAINT "bookTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
