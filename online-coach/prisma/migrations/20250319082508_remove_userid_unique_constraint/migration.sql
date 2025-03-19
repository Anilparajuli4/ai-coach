-- DropForeignKey
ALTER TABLE "CoverLetter" DROP CONSTRAINT "CoverLetter_userId_fkey";

-- DropIndex
DROP INDEX "CoverLetter_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coverLetterId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coverLetterId_fkey" FOREIGN KEY ("coverLetterId") REFERENCES "CoverLetter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
