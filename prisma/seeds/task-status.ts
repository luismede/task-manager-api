import { Prisma, PrismaClient } from "@prisma/client";
import { SeedFunction } from "./type";
import {TaskStatusEnum} from '../../src/shared/enums'


export default <SeedFunction>async function(prismaClient: PrismaClient): Promise<void> {
  const data: Prisma.TaskStatusUncheckedCreateInput[] = [
    {
      id: TaskStatusEnum.TODO,
      name: 'Pendente'
    },
    {
      id: TaskStatusEnum.IN_PROGRESS,
      name: 'Em progresso'
    },
    {
      id: TaskStatusEnum.DONE,
      name: 'Finalizado'
    }
  ];

  try {
    await prismaClient.taskStatus.createMany({
      data
    });
  } catch (e) {
    console.error(
      e instanceof Error ? e.stack : e
    )
  }
} 
