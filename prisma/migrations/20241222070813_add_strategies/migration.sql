-- CreateTable
CREATE TABLE "_StrategyToTokens" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StrategyToTokens_AB_unique" ON "_StrategyToTokens"("A", "B");

-- CreateIndex
CREATE INDEX "_StrategyToTokens_B_index" ON "_StrategyToTokens"("B");

-- AddForeignKey
ALTER TABLE "_StrategyToTokens" ADD CONSTRAINT "_StrategyToTokens_A_fkey" FOREIGN KEY ("A") REFERENCES "Strategy"("strategyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StrategyToTokens" ADD CONSTRAINT "_StrategyToTokens_B_fkey" FOREIGN KEY ("B") REFERENCES "Tokens"("tokenId") ON DELETE CASCADE ON UPDATE CASCADE;
