import {
    BadRequestException,
    ConflictException,
    HttpException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { PrismaDb1Service } from 'prisma/db1/prisma-db1.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePaymentResponse } from './interfaces/payment.interfaces';
import { Payment, PaymentConcept } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
    constructor(
        private prismaDb1Service: PrismaDb1Service
    ) { }

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<CreatePaymentResponse> {
        try {

            if (createPaymentDto.amount <= 0) {
                throw new BadRequestException('Amount must be greater than zero');
            }

            const booking = await this.prismaDb1Service.booking.findUnique({
                where: { id: Number(createPaymentDto.bookingId) },
                include: {
                    corporateRate: true,
                    touristRate: true
                }
            });

            if (!booking) {
                throw new NotFoundException('Booking not found');
            }

            const newPayment = await this.prismaDb1Service.payment.create({
                data: {
                    bookingId: Number(createPaymentDto.bookingId),
                    concept: createPaymentDto.concept,
                    amount: createPaymentDto.amount
                },
                include: {
                    booking: true
                }
            });

            const responseData: Payment = {
                id: newPayment.id,
                bookingId: newPayment.bookingId,
                concept: newPayment.concept as PaymentConcept,
                amount: newPayment.amount,
                createdAt: newPayment.createdAt
            };

            return {
                status: 'success',
                message: 'Payment created successfully',
                statusCode: 201,
                data: responseData
            };

        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException ||
                error instanceof NotFoundException
            ) {
                throw error;
            } else {
                console.error('Error creating payment:', error);
                throw new HttpException('Failed to create payment', 500);
            }
        }
    }
}