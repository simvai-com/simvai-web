// lib/prisma.cjs.js
const { PrismaClient } = require('@prisma/client');

const globalForPrisma = global;
globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient({
  log: ['query', 'error', 'warn'],
});

module.exports = globalForPrisma.prisma;
