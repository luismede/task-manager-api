import type { PrismaService } from '../../shared/database/services/prisma.service';
import type { RedisService } from '../../../redis/services/redis.service';
import { FindTaskAllService } from './find-task-all.service';

describe('FindTaskAllService', () => {
  const task = {
    id: 1,
    name: 'Tarefa',
    description: null,
    createdAt: new Date('2025-01-01T00:00:00.000Z'),
    finishedAt: null,
    statusId: 1,
    status: { id: 1, name: 'TODO' },
  };
  const prisma = { task: { findMany: jest.fn() } };
  const redis = { get: jest.fn(), set: jest.fn() };
  const service = new FindTaskAllService(
    prisma as unknown as PrismaService,
    redis as unknown as RedisService,
  );

  beforeEach(() => jest.resetAllMocks());

  it('retorna o conteúdo em cache sem consultar o banco', async () => {
    const cached = {
      data: [{ ...task, createdAt: task.createdAt.toISOString() }],
    };
    redis.get.mockResolvedValue(JSON.stringify(cached));
    await expect(service.execute()).resolves.toEqual(cached);
    expect(redis.get).toHaveBeenCalledWith('tasks:all');
    expect(prisma.task.findMany).not.toHaveBeenCalled();
  });

  it('consulta o banco e grava no cache quando não há entrada', async () => {
    redis.get.mockResolvedValue(null);
    prisma.task.findMany.mockResolvedValue([task]);
    await expect(service.execute()).resolves.toEqual({ data: [task] });
    expect(prisma.task.findMany).toHaveBeenCalledTimes(1);
    expect(redis.set).toHaveBeenCalledWith(
      'tasks:all',
      JSON.stringify([task]),
      { ttl: 86400 },
    );
  });
});
