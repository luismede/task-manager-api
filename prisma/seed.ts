import { PrismaClient } from "@prisma/client";
import { SeedFunction } from "./seeds/type";
import seedTaskStatus from "./seeds/task-status";

async function seed(): Promise<void> {
  const consoleTimeTrackingLabel = 'Seed execution time!';
  const prismaClient = new PrismaClient();
  const seeds: SeedFunction[] = [seedTaskStatus];

  console.time(consoleTimeTrackingLabel);
  for (const seed of seeds) {
    await seed(prismaClient);
  }
  console.timeEnd(consoleTimeTrackingLabel)
}

seed();
