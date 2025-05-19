import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaDb3Service } from 'prisma/db3/prisma-db3.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaDb3Service],
})
export class UsersModule {}