import { PrismaClient } from "@prisma/client" ;

export type SeedFunction = (PrismaClient: PrismaClient) => Promise<void>;
