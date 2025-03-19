/*
  Warnings:

  - You are about to alter the column `atsScore` on the `Resume` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Resume" ALTER COLUMN "atsScore" SET DATA TYPE INTEGER;
