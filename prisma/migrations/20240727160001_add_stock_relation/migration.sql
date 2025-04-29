/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codeTS]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Stock_code_key" ON "Stock"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_codeTS_key" ON "Stock"("codeTS");

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_code_fkey" FOREIGN KEY ("code") REFERENCES "Stock"("codeTS") ON DELETE RESTRICT ON UPDATE CASCADE;
