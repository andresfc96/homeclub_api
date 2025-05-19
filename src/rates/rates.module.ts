import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { PrismaDb1Service } from 'prisma/db1/prisma-db1.service';

@Module({
  controllers: [RatesController],
  providers: [RatesService, PrismaDb1Service],
})
export class RatesModule { }
