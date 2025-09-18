import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/shared/database/services/prisma.service";
import { FindTaskByIdOutputDTO } from "../dto/io/find-task-by-id.output";
import { FindTaskByIdInputDTO } from "../dto/io/find-task-by-id-input.dto";
import { RedisService } from "redis/services/redis.service";

@Injectable()
export class FindTaskByIdService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService
  ) {};


  public async execute({id}: FindTaskByIdInputDTO): Promise<FindTaskByIdOutputDTO> { 

    const default_TTL = 60 * 60 * 24;
    const cacheKey = `tasks:${id}`;
    const cachedTask = await this.redisService.get(cacheKey);
    if (cachedTask) {
      console.log('Returning cached task');
      return JSON.parse(cachedTask);
    }

     const taskById = await this.prismaService.task.findFirst({
      where: {
        id,
      },
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
      },
    }); 

    if (!taskById) throw new NotFoundException('Tarefa não encontrada');

    await this.redisService.set(cacheKey, JSON.stringify(taskById), { ttl: default_TTL})
 
    return taskById;
    
  }
}
