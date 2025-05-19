import { Module } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { PrismaDb1Service } from 'prisma/db1/prisma-db1.service';
import { PrismaDb2Service } from 'prisma/db2/prisma-db2.service';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService, PrismaDb1Service, PrismaDb2Service],
})
export class ApartmentsModule { }
