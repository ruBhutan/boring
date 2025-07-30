import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Create a global variable to store the Prisma client instance
declare global {
  var __prisma: PrismaClient | undefined;
}

// Use a singleton pattern to avoid creating multiple instances in development
export const prisma = globalThis.__prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// For backward compatibility, export as db
export const db = prisma;

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});