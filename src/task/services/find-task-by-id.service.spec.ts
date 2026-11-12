import { NotFoundException } from '@nestjs/common';
import type { PrismaService } from '../../shared/database/services/prisma.service';
import type { RedisService } from '../../../redis/services/redis.service';
import { FindTaskByIdService } from './find-task-by-id.service';

describe('FindTaskByIdService', () => {
  const task = {
    id: 1,
    name: 'Tarefa',
    description: null,
    createdAt: new Date('2025-01-01T00:00:00.000Z'),
    finishedAt: null,
    statusId: 1,
    status: { id: 1, name: 'TODO' },
  };
  const prisma = { task: { findFirst: jest.fn() } };
  const redis = { get: jest.fn(), set: jest.fn() };
  const service = new FindTaskByIdService(
    prisma as unknown as PrismaService,
    redis as unknown as RedisService,
  );

  beforeEach(() => jest.resetAllMocks());

  it('retorna o conteúdo em cache sem consultar o banco', async () => {
    const cached = { ...task, createdAt: task.createdAt.toISOString() };
    redis.get.mockResolvedValue(JSON.stringify(cached));
    await expect(service.execute({ id: 1 })).resolves.toEqual(cached);
    expect(redis.get).toHaveBeenCalledWith('tasks:1');
    expect(prisma.task.findFirst).not.toHaveBeenCalled();
  });

  it('consulta o banco e grava no cache quando não há entrada', async () => {
    redis.get.mockResolvedValue(null);
    prisma.task.findFirst.mockResolvedValue(task);
    await expect(service.execute({ id: 1 })).resolves.toEqual(task);
    expect(redis.set).toHaveBeenCalledWith('tasks:1', JSON.stringify(task), {
      ttl: 86400,
    });
  });

  it('lança NotFoundException quando a tarefa não existe', async () => {
    redis.get.mockResolvedValue(null);
    prisma.task.findFirst.mockResolvedValue(null);
    await expect(service.execute({ id: 1 })).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(redis.set).not.toHaveBeenCalled();
  });
});
