import { NotFoundException } from '@nestjs/common';
import type { PrismaService } from '../../shared/database/services/prisma.service';
import type { RedisService } from '../../../redis/services/redis.service';
import { DeleteTaskService } from './delete-task.service';

describe('DeleteTaskService', () => {
  it('impede a exclusão de tarefa inexistente', async () => {
    const prisma = {
      task: { findFirst: jest.fn().mockResolvedValue(null), delete: jest.fn() },
    };
    const redis = { delete: jest.fn() };
    const service = new DeleteTaskService(
      prisma as unknown as PrismaService,
      redis as unknown as RedisService,
    );

    await expect(service.execute({ id: 1 })).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(prisma.task.delete).not.toHaveBeenCalled();
    expect(redis.delete).not.toHaveBeenCalled();
  });
});
