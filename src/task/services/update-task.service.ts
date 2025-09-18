import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateTaskOutputDTO } from "../dto/io/update-task-output.dto";
import { PrismaService } from "src/shared/database/services/prisma.service";
import { RedisService } from "redis/services/redis.service";
import { UpdateTaskInputDTO } from "src/task/dto/io/update-task-input.dto"

@Injectable()
export class UpdateTaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService
  ) {}

   public async execute({id, name, finishedAt,description,statusId}: UpdateTaskInputDTO): Promise<UpdateTaskOutputDTO> {
      const taskExists = await this.prismaService.task.findFirst({
      where: {
        id
      },
      select: {
        id: true,
      },
      });

    const statusExists = await this.prismaService.taskStatus.findFirst({
      where: {
        id: statusId,
      },
      select: {
        id: true
      },
      });

    if (!taskExists) throw new NotFoundException('Ops! Tarefa não encontrada!');
   if (!statusExists) throw new NotFoundException('Ops! Status da tarefa não encontrada!');
    const result = this.prismaService.task.update({
      data: {
        id,
        name,
        finishedAt,
        description,
        statusId,
      },
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        finishedAt: true,
        statusId: true,
        status: {
          select: {
            id: true,
            name: true
          }
        }

      }
    })

  
    await this.redisService.delete(`tasks:all`)

    return result;
  }
}
