import { Module } from "@nestjs/common";
import { TaskModule } from './task/task.module'
import { DatabaseModule } from "./shared/database/database.module";
import { RouterModule } from "@nestjs/core";
import { RedisModule } from "redis/redis.module";

@Module({
  imports: [
    DatabaseModule,
    TaskModule,
    RedisModule,
    RouterModule.register([
      {
        path: 'task',
        module: TaskModule
      }
    ])
  ],
})
export class AppModule {}
