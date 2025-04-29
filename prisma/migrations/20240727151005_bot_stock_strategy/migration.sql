-- CreateEnum
CREATE TYPE "Exchange" AS ENUM ('moex', 'futures', 'crypto');

-- CreateTable
CREATE TABLE "Strategy" (
    "strategyId" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "exchange" "Exchange" NOT NULL DEFAULT 'crypto',

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("strategyId")
);

-- CreateTable
CREATE TABLE "Bot" (
    "botId" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "exchange" "Exchange" NOT NULL DEFAULT 'crypto',

    CONSTRAINT "Bot_pkey" PRIMARY KEY ("botId")
);

-- CreateTable
CREATE TABLE "Stock" (
    "stockId" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "code" TEXT NOT NULL,
    "codeTS" TEXT NOT NULL,
    "codeFut" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "lvg" DOUBLE PRECISION NOT NULL,
    "lotPrec" INTEGER NOT NULL,
    "exchange" "Exchange" NOT NULL DEFAULT 'crypto',

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("stockId")
);

-- CreateIndex
CREATE INDEX "Deal_hash_idx" ON "Deal"("hash");

-- CreateIndex
CREATE INDEX "Deal_bot_idx" ON "Deal"("bot");

-- CreateIndex
CREATE INDEX "Deal_code_idx" ON "Deal"("code");

-- CreateIndex
CREATE INDEX "Deal_isOpen_idx" ON "Deal"("isOpen");

-- CreateIndex
CREATE INDEX "DealLog_hash_idx" ON "DealLog"("hash");

-- CreateIndex
CREATE INDEX "DealLog_bot_idx" ON "DealLog"("bot");

-- CreateIndex
CREATE INDEX "DealLog_code_idx" ON "DealLog"("code");
