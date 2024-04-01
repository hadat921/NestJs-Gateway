-- AlterTable
ALTER TABLE "book" ADD COLUMN     "updater_id" INTEGER;

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_updater_id_fkey" FOREIGN KEY ("updater_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
