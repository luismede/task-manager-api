import { Global, Module } from "@nestjs/common";
import { RedisService } from "./services/redis.service";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Global()
@Module({
  imports: [
    ConfigModule
  ],
  providers: [
    RedisService
  ],
  exports: [
    RedisService
  ]
})

export class RedisModule {}
