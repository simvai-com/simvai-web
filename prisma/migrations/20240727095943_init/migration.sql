-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "email" TEXT NOT NULL,
    "telegramId" TEXT,
    "password" TEXT NOT NULL,
    "secret" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Deal" (
    "dealId" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "bot" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "dealDate" TIMESTAMP(3) NOT NULL,
    "timeLn" INTEGER NOT NULL,
    "timeSh" INTEGER NOT NULL,
    "dateLn" INTEGER NOT NULL,
    "dateSh" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "currentSize" INTEGER NOT NULL,
    "direction" INTEGER NOT NULL,
    "enter" DOUBLE PRECISION NOT NULL,
    "stop" DOUBLE PRECISION NOT NULL,
    "pnlpos" DOUBLE PRECISION NOT NULL,
    "riskpos" DOUBLE PRECISION NOT NULL,
    "isOpen" BOOLEAN NOT NULL,

    CONSTRAINT "Deal_pkey" PRIMARY KEY ("dealId")
);

-- CreateTable
CREATE TABLE "DealLog" (
    "dealLogId" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "bot" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "dealDate" TIMESTAMP(3) NOT NULL,
    "timeLn" INTEGER NOT NULL,
    "timeSh" INTEGER NOT NULL,
    "dateLn" INTEGER NOT NULL,
    "dateSh" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "direction" INTEGER NOT NULL,
    "enter" DOUBLE PRECISION NOT NULL,
    "stop" DOUBLE PRECISION NOT NULL,
    "pnlpos" DOUBLE PRECISION NOT NULL,
    "riskpos" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "DealLog_pkey" PRIMARY KEY ("dealLogId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Deal_hash_key" ON "Deal"("hash");
