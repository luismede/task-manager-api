import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../shared/database/services/prisma.service"
import { DeleteTaskInputDTO } from "../dto/io/delete-task-input.dto";
import { DeleteTaskOutputDTO } from "../dto/io/delete-task-output.dto";
import { RedisService } from "redis/services/redis.service";

@Injectable()
export class DeleteTaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService
  ) {}
  public async execute({id}: DeleteTaskInputDTO): Promise<DeleteTaskOutputDTO> {
    const taskExists = await this.prismaService.task.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!taskExists) throw new NotFoundException('Tarefa não encontrada');

    await this.prismaService.task.delete({
      where: {
        id,
      },
    });

    await this.redisService.delete('tasks:all')

    return {
      id,
      message: 'Tarefa deletada com sucesso!'
    }
  }
}
