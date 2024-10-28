import { PrismaClient } from '@prisma/client';
let client = new PrismaClient();
console.log("[DEBUG] Connected to database");
export const prisma = client;