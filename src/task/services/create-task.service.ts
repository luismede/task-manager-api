import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/services/prisma.service";
import {CreateTaskInputDTO} from "src/task/dto/io/create-task-input.dto"
import { CreateTaskOutputDTO } from "../dto/io/create-task-output.dto";
import { TaskStatusEnum } from "src/shared";
import { RedisService } from "redis/services/redis.service";

@Injectable()
export class CreateTaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService, 
  ) {}

  public async execute({name, finishedAt, description}: CreateTaskInputDTO): Promise<CreateTaskOutputDTO> {

    const taskWithSameName = await this.prismaService.task.findFirst({
      where: {
        name,
      },
      select: {
        id: true,
      },
    });

    if (taskWithSameName) throw new ConflictException('Ops! Já existe uma tarefa com esse nome');

    const result = this.prismaService.task.create({
      data: {
        name,
        description,
        finishedAt,
        statusId: TaskStatusEnum.TODO,
      },
      select: {
        name: true,
        id: true,
        createdAt: true,
        finishedAt: true,
    }
    })

    await this.redisService.delete('tasks:all');
    return result;
  }
}
