import { BadRequestException, ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaDb1Service } from 'prisma/db1/prisma-db1.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateBookingResponse } from './interfaces/booking.interfaces';
import { BookingStatus } from './entities/booking.entity';

@Injectable()
export class BookingsService {
    constructor(
        private prismaDb1Service: PrismaDb1Service,
    ) { }

    async createBooking(createBookingDto: CreateBookingDto): Promise<CreateBookingResponse> {
        try {
            const startDate = new Date(createBookingDto.startDate);
            const endDate = new Date(createBookingDto.endDate);

            if (startDate >= endDate) {
                throw new BadRequestException('End date must be after start date');
            }

            if (startDate < new Date()) {
                throw new BadRequestException('Start date cannot be in the past');
            }

            const apartmentExists = await this.prismaDb1Service.apartment.findUnique({
                where: { id: createBookingDto.apartmentId }
            });

            if (!apartmentExists) {
                throw new NotFoundException('Apartment not found');
            }

            const clientExists = await this.prismaDb1Service.client.findUnique({
                where: { id: createBookingDto.clientId }
            });

            if (!clientExists) {
                throw new NotFoundException('Client not found');
            }

            const conflictingBookings = await this.prismaDb1Service.booking.findMany({
                where: {
                    apartmentId: createBookingDto.apartmentId,
                    NOT: { status: BookingStatus.Cancelled },
                    OR: [
                        {
                            startDate: { lte: endDate },
                            endDate: { gte: startDate }
                        }
                    ]
                }
            });

            if (conflictingBookings.length > 0) {
                throw new ConflictException('Apartment is not available for the selected dates');
            }

            if (apartmentExists.type === 'Corporate' && !createBookingDto.corporateRateId) {
                throw new BadRequestException('Corporate rate is required for corporate apartments');
            }

            if (apartmentExists.type === 'Tourist' && !createBookingDto.touristRateId) {
                throw new BadRequestException('Tourist rate is required for tourist apartments');
            }

            if (createBookingDto.corporateRateId) {
                const rateExists = await this.prismaDb1Service.corporateRate.findUnique({
                    where: { id: createBookingDto.corporateRateId }
                });

                if (!rateExists || rateExists.apartmentId !== createBookingDto.apartmentId) {
                    throw new BadRequestException('Invalid corporate rate');
                }
            }

            if (createBookingDto.touristRateId) {
                const rateExists = await this.prismaDb1Service.touristRate.findUnique({
                    where: { id: createBookingDto.touristRateId }
                });

                if (!rateExists || rateExists.apartmentId !== createBookingDto.apartmentId) {
                    throw new BadRequestException('Invalid tourist rate');
                }
            }

            const bookingCode = `RES-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            await this.prismaDb1Service.booking.create({
                data: {
                    code: bookingCode,
                    apartmentId: createBookingDto.apartmentId,
                    clientId: createBookingDto.clientId,
                    startDate: startDate,
                    endDate: endDate,
                    status: createBookingDto.status || BookingStatus.Active,
                    corporateRateId: createBookingDto.corporateRateId,
                    touristRateId: createBookingDto.touristRateId
                },
                include: {
                    apartment: true,
                    client: true,
                    corporateRate: createBookingDto.corporateRateId ? true : false,
                    touristRate: createBookingDto.touristRateId ? true : false
                }
            });

            return {
                status: 'success',
                message: 'Booking created successfully',
                statusCode: 201
            };
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException ||
                error instanceof NotFoundException
            ) {
                throw error;
            } else {
                console.error('Error creating booking:', error);
                throw new HttpException('Failed to create booking', 500);
            }
        }
    }
}