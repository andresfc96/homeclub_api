import { BadRequestException, ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaDb1Service } from 'prisma/db1/prisma-db1.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { CreateRateResponse } from './interfaces/rate.interfaces';

@Injectable()
export class RatesService {
    constructor(
        private prismaDb1Service: PrismaDb1Service
    ) { }

    async createRate(createRateDto: CreateRateDto): Promise<CreateRateResponse> {
        try {
            const apartment = await this.prismaDb1Service.apartment.findUnique({
                where: { id: createRateDto.apartmentId }
            });

            if (!apartment) {
                throw new NotFoundException(`Apartment with ID ${createRateDto.apartmentId} not found`);
            }

            let newRate;

            if (apartment.type === 'Corporate') {
                if (!createRateDto.monthlyRate) {
                    throw new BadRequestException('Monthly rate is required for corporate apartments');
                }

                newRate = await this.prismaDb1Service.corporateRate.create({
                    data: {
                        apartmentId: createRateDto.apartmentId,
                        startDate: createRateDto.startDate,
                        endDate: createRateDto.endDate,
                        monthlyRate: createRateDto.monthlyRate
                    }
                });
            }
            else if (apartment.type === 'Tourist') {
                if (!createRateDto.dailyRate) {
                    throw new BadRequestException('Daily rate is required for tourist apartments');
                }

                newRate = await this.prismaDb1Service.touristRate.create({
                    data: {
                        apartmentId: createRateDto.apartmentId,
                        startDate: createRateDto.startDate,
                        endDate: createRateDto.endDate,
                        dailyRate: createRateDto.dailyRate
                    }
                });
            }
            else {
                throw new BadRequestException('Invalid apartment type');
            }

            return {
                status: 'ok',
                message: 'Rate created successfully',
                statusCode: 201,
                data: newRate
            };

        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException ||
                error instanceof NotFoundException
            ) {
                throw error;
            } else {
                throw new HttpException('Failed to create rate', 500);
            }
        }
    }
}