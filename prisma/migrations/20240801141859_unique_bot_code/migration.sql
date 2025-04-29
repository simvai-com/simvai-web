/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Bot` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Strategy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bot_code_key" ON "Bot"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Strategy_code_key" ON "Strategy"("code");
