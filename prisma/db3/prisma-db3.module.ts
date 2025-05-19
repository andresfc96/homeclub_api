import { Module } from '@nestjs/common';
import { PrismaDb3Service } from './prisma-db3.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PrismaDb3Service,
      useFactory: (config: ConfigService) => {
        return new PrismaDb3Service(config);
      },
      inject: [ConfigService],
    },
  ],
  exports: [PrismaDb3Service],
})
export class PrismaDb3Module {}