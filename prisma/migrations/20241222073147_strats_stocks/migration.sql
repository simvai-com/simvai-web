-- CreateTable
CREATE TABLE "_StockToStrategy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StockToStrategy_AB_unique" ON "_StockToStrategy"("A", "B");

-- CreateIndex
CREATE INDEX "_StockToStrategy_B_index" ON "_StockToStrategy"("B");

-- AddForeignKey
ALTER TABLE "_StockToStrategy" ADD CONSTRAINT "_StockToStrategy_A_fkey" FOREIGN KEY ("A") REFERENCES "Stock"("stockId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StockToStrategy" ADD CONSTRAINT "_StockToStrategy_B_fkey" FOREIGN KEY ("B") REFERENCES "Strategy"("strategyId") ON DELETE CASCADE ON UPDATE CASCADE;
