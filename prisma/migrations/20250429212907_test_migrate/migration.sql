-- AlterTable
ALTER TABLE "_StockToStrategy" ADD CONSTRAINT "_StockToStrategy_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_StockToStrategy_AB_unique";

-- AlterTable
ALTER TABLE "_StrategyToTokens" ADD CONSTRAINT "_StrategyToTokens_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_StrategyToTokens_AB_unique";

-- CreateTable
CREATE TABLE "test" (
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "test_email_key" ON "test"("email");
