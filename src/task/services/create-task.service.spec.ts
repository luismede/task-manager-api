import { ConflictException } from '@nestjs/common';
import type { PrismaService } from '../../shared/database/services/prisma.service';
import type { RedisService } from '../../../redis/services/redis.service';
import { CreateTaskService } from './create-task.service';

describe('CreateTaskService', () => {
  it('impede a criação de tarefa com nome duplicado', async () => {
    const prisma = {
      task: {
        findFirst: jest.fn().mockResolvedValue({ id: 1 }),
        create: jest.fn(),
      },
    };
    const redis = { delete: jest.fn() };
    const service = new CreateTaskService(
      prisma as unknown as PrismaService,
      redis as unknown as RedisService,
    );

    await expect(service.execute({ name: 'Tarefa' })).rejects.toBeInstanceOf(
      ConflictException,
    );
    expect(prisma.task.findFirst).toHaveBeenCalledWith({
      where: { name: 'Tarefa' },
      select: { id: true },
    });
    expect(prisma.task.create).not.toHaveBeenCalled();
    expect(redis.delete).not.toHaveBeenCalled();
  });
});
