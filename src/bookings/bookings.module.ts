import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaDb1Service } from 'prisma/db1/prisma-db1.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, PrismaDb1Service],
})
export class BookingsModule { }
