import { NotFoundException } from '@nestjs/common';
import type { PrismaService } from '../../shared/database/services/prisma.service';
import type { RedisService } from '../../../redis/services/redis.service';
import { UpdateTaskService } from './update-task.service';

describe('UpdateTaskService', () => {
  const prisma = { task: { findFirst: jest.fn(), update: jest.fn() }, taskStatus: { findFirst: jest.fn() } };
  const redis = { delete: jest.fn() };
  const service = new UpdateTaskService(prisma as unknown as PrismaService, redis as unknown as RedisService);

  beforeEach(() => jest.resetAllMocks());

  it('lança NotFoundException quando a tarefa não existe', async () => {
    prisma.task.findFirst.mockResolvedValue(null);
    prisma.taskStatus.findFirst.mockResolvedValue({ id: 1 });
    const result = service.execute({ id: 1, statusId: 1 });
    await expect(result).rejects.toBeInstanceOf(NotFoundException);
    await expect(result).rejects.toThrow('Ops! Tarefa não encontrada!');
    expect(prisma.task.update).not.toHaveBeenCalled();
    expect(redis.delete).not.toHaveBeenCalled();
  });

  it('lança NotFoundException quando o status não existe', async () => {
    prisma.task.findFirst.mockResolvedValue({ id: 1 });
    prisma.taskStatus.findFirst.mockResolvedValue(null);
    await expect(service.execute({ id: 1, statusId: 2 })).rejects.toBeInstanceOf(NotFoundException);
    expect(prisma.task.update).not.toHaveBeenCalled();
    expect(redis.delete).not.toHaveBeenCalled();
  });
});
