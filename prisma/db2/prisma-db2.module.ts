import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaDb2Service } from './prisma-db2.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PrismaDb2Service,
      useFactory: (config: ConfigService) => {
        return new PrismaDb2Service(config);
      },
      inject: [ConfigService],
    },
  ],
  exports: [PrismaDb2Service],
})
export class PrismaDb2Module { }