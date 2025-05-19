import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaDb1Module } from 'prisma/db1/prisma-db1.module';
import { PrismaDb2Module } from 'prisma/db2/prisma-db2.module';
import { PrismaDb3Module } from 'prisma/db3/prisma-db3.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { RatesModule } from './rates/rates.module';
import { ClientsModule } from './clients/clients.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaDb1Module,
    PrismaDb2Module,
    PrismaDb3Module,
    AuthModule,
    UsersModule,
    ApartmentsModule,
    RatesModule,
    ClientsModule,
    BookingsModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
