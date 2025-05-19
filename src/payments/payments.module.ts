import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaDb1Service } from 'prisma/db1/prisma-db1.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaDb1Service],
})
export class PaymentsModule { }
