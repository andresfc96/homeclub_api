import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaDb1Service } from './prisma-db1.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PrismaDb1Service,
      useFactory: (config: ConfigService) => {
        return new PrismaDb1Service(config);
      },
      inject: [ConfigService],
    },
  ],
  exports: [PrismaDb1Service],
})
export class PrismaDb1Module {}