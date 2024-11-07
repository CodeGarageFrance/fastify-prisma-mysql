import { PrismaClient } from '@prisma/client';
let client = new PrismaClient();
await client.$connect();
console.log("[DEBUG] Connected to database");
export const prisma = client;