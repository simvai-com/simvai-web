-- CreateTable
CREATE TABLE "Tokens" (
    "tokenId" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,
    "token" TEXT NOT NULL,
    "dateTo" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("tokenId")
);
