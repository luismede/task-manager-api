import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/database/services/prisma.service";
import { FindTaskAllOutputDTO } from "../dto/io/find-task-all-output.dto";
import { RedisService } from "redis/services/redis.service";

@Injectable()
export class FindTaskAllService {
 
  constructor (
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService
  ) {}

  public async execute(): Promise<FindTaskAllOutputDTO> {
    const default_TTL = 60 * 60 * 24;


    const cacheKey = 'tasks:all'

    const cachedTasks = await this.redisService.get(cacheKey)
    if (cachedTasks) {
      console.log(`Tasks em cache: ${JSON.parse(cachedTasks)}`)
      return JSON.parse(cachedTasks)
    } 
    const tasks = await this.prismaService.task.findMany({
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
            name: true,
          }
        }
      }     
    });
    await this.redisService.set(cacheKey, JSON.stringify(tasks), {ttl: default_TTL});
    console.log('Caching all tasks in Redis store');

    return {
      data: tasks.map(task => ({
        id: task.id,
        name: task.name,
        description: task.description || null,
        createdAt: task.createdAt,
        finishedAt: task.finishedAt || null,
        statusId: task.statusId, 
        status: task.status
      })),
    };
  }
} 
