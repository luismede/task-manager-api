import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import * as Redis from "ioredis";
import {ConfigService} from '@nestjs/config'
import { TaskStatus } from "@prisma/client";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy{

  private client: Redis.Redis;
  private readonly logger = new Logger(RedisService.name);
  private readonly DEFAULT_TTL = 60 * 60 * 24;

  constructor(private readonly ConfigService: ConfigService) {
    this.client = new Redis.Redis(
      this.ConfigService.get<string>(
        'REDIS_CACHE_URL', 
        'redis://localhost:6379',
      ),
      {
        enableOfflineQueue: false,
        db: +this.ConfigService.get<string>('REDIS_CACHE_DATABASE', '0'),
        retryStrategy(times) {
        if (times >= 20) {
          return null;
        }

        return Math.min(times * 100, 2000);
        }
      }
    )
  }

  async onModuleInit() {
    this.client.on('error', (error: Error) => this.logger.error(error, `Redis error: ${error.stack}`));
    this.client.on('connect', () => this.logger.log('Redis connected'));
    this.client.on('reconnecting', () => this.logger.log('Redis reconnecting'));
    this.client.on('ready', () => this.logger.log('Redis client was ended'));
    this.client.on('end', () => this.logger.log('Redis client was ended')) 
  }
 
  async onModuleDestroy() {
    await this.client.quit();
  }

  public set(
    key: string,
    value: string,
    options?: { ttl: number }
  ): Promise<string> {
      if(options?.ttl) {
        return this.client.set(key, JSON.stringify(value), 'EX', options.ttl);
    } else {
        return this.client.set(key, JSON.stringify(value));
    }
  }

  public async get(key: string): Promise<string | null> {
    return await  this.client.get(key);
  }

  public delete(key: string): Promise<number> {
    return this.client.del(key);
  }

  public getClient(): Redis.Redis {
    return this.client;
  }

}

