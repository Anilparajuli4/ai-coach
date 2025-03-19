/*
  Warnings:

  - You are about to drop the `AssessMents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssessMents" DROP CONSTRAINT "AssessMents_userId_fkey";

-- DropTable
DROP TABLE "AssessMents";

-- CreateTable
CREATE TABLE "Assessments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "quizScore" INTEGER NOT NULL,
    "questions" JSONB NOT NULL,
    "category" TEXT NOT NULL,
    "improvementTip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Assessments_userId_idx" ON "Assessments"("userId");

-- AddForeignKey
ALTER TABLE "Assessments" ADD CONSTRAINT "Assessments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
