import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaDb1Service } from 'prisma/db1/prisma-db1.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaDb1Service],
})
export class ClientsModule { }
