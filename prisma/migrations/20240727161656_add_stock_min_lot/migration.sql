/*
  Warnings:

  - Added the required column `minLot` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "minLot" DOUBLE PRECISION NOT NULL;
