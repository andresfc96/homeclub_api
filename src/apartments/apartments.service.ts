import { BadRequestException, ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaDb1Service } from 'prisma/db1/prisma-db1.service';
import { PrismaDb2Service } from 'prisma/db2/prisma-db2.service';
import { CreateApartmentResponse, GetApartmentsResponse } from './interfaces/apartment.interfaces';
import { CreateApartmentDto, CreatePropertyInfoDto, GetNearbyApartmentsDto } from './dto/create-apartment.dto';
import { ApartmentType } from './entities/apartment.entity';

@Injectable()
export class ApartmentsService {
    constructor(
        private prismaDb1Service: PrismaDb1Service,
        private prismaDb2Service: PrismaDb2Service,
    ) { }

    async createApartment(createApartmentDto: CreateApartmentDto): Promise<CreateApartmentResponse> {
        try {

            const newApartment = await this.prismaDb1Service.apartment.create({
                data: {
                    name: createApartmentDto.name,
                    address: createApartmentDto.address,
                    type: createApartmentDto.type,
                    city: createApartmentDto.city,
                    country: createApartmentDto.country,
                    latitude: createApartmentDto.latitude,
                    longitude: createApartmentDto.longitude,
                    isActive: createApartmentDto.isActive ?? true
                }
            });

            return {
                status: 'ok',
                message: 'Apartment created successfully',
                statusCode: 201,
                data: newApartment
            };
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
            ) {
                throw error;
            } else {
                throw new HttpException('Failed to create apartment', 500);
            }
        }
    }

    async createApartmentInfo(createPropertyInfoDto: CreatePropertyInfoDto): Promise<CreateApartmentResponse> {
        try {
            const existingPropertyInfo = await this.prismaDb2Service.propertyInfo.findUnique({
                where: { propertyCode: createPropertyInfoDto.propertyCode.toString() }
            });

            if (existingPropertyInfo) {
                throw new ConflictException(`Property info with code ${createPropertyInfoDto.propertyCode} already exists`);
            }

            const newPropertyInfo = await this.prismaDb2Service.propertyInfo.create({
                data: {
                    propertyCode: createPropertyInfoDto.propertyCode.toString(),
                    description: createPropertyInfoDto.description,
                    imageUrl: createPropertyInfoDto.imageUrl.toString()
                }
            });

            return {
                status: 'ok',
                message: 'Property info created successfully',
                statusCode: 201,
                data: newPropertyInfo
            };
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
            ) {
                throw error;
            } else {
                throw new HttpException('Failed to create property info', 500);
            }
        }
    }

    async getApartments(): Promise<GetApartmentsResponse> {
        try {
            const apartments = await this.prismaDb1Service.apartment.findMany({
                where: { isActive: true },
                orderBy: { name: 'asc' },
            });

            const mappedApartments = apartments.map(apt => ({
                ...apt,
                type: apt.type as ApartmentType
            }));

            return {
                status: 'ok',
                message: 'Fetch apartments successfully',
                data: mappedApartments,
                statusCode: 201,
            };
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
            ) {
                throw error;
            } else {
                throw new HttpException('Failed to fetch apartments', 500);
            }
        }
    }

    async findNearbyApartments(params: GetNearbyApartmentsDto) {
        const {
            latitude,
            longitude,
            type,
            minPrice,
            maxPrice,
            page = 1,
            limit = 10
        } = params;

        if (!latitude || !longitude) {
            throw new BadRequestException('Latitude and longitude are required');
        }

        const today = new Date();

        try {
            const allApartments = await this.prismaDb1Service.apartment.findMany({
                where: {
                    isActive: true,
                    type: type ? type as ApartmentType : undefined,
                },
                include: {
                    corporateRates: true,
                    touristRates: true
                }
            });

            const filteredApartments = allApartments.filter(apartment => {
                let currentRate;
                if (apartment.type === 'Corporate') {
                    const rate = apartment.corporateRates.find(r =>
                        new Date(r.startDate) <= today && new Date(r.endDate) >= today
                    );
                    if (!rate) return false;
                    currentRate = rate.monthlyRate;
                } else {
                    const rate = apartment.touristRates.find(r =>
                        new Date(r.startDate) <= today && new Date(r.endDate) >= today
                    );
                    if (!rate) return false;
                    currentRate = rate.dailyRate;
                }

                if (minPrice !== undefined && currentRate < minPrice) return false;
                if (maxPrice !== undefined && currentRate > maxPrice) return false;

                return true;
            });

            filteredApartments.sort((a, b) => {
                const distA = this.calculateDistance(latitude, longitude, a.latitude, a.longitude);
                const distB = this.calculateDistance(latitude, longitude, b.latitude, b.longitude);
                return distA - distB;
            });

            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedApartments = filteredApartments.slice(startIndex, endIndex);

            const apartmentIds = paginatedApartments.map(a => a.id.toString());
            const propertyInfos = await this.prismaDb2Service.propertyInfo.findMany({
                where: {
                    propertyCode: { in: apartmentIds }
                }
            });

            const results = paginatedApartments.map(apartment => {
                const info = propertyInfos.find(i => i.propertyCode === apartment.id.toString());
                let currentRate;

                if (apartment.type === 'Corporate') {
                    const rate = apartment.corporateRates.find(r =>
                        new Date(r.startDate) <= today && new Date(r.endDate) >= today
                    );
                    currentRate = rate?.monthlyRate;
                } else {
                    const rate = apartment.touristRates.find(r =>
                        new Date(r.startDate) <= today && new Date(r.endDate) >= today
                    );
                    currentRate = rate?.dailyRate;
                }

                return {
                    id: apartment.id,
                    name: apartment.name,
                    latitude: apartment.latitude,
                    longitude: apartment.longitude,
                    type: apartment.type,
                    currentRate,
                    description: info?.description,
                    imageUrl: info?.imageUrl,
                    distance: this.calculateDistance(
                        latitude,
                        longitude,
                        apartment.latitude,
                        apartment.longitude
                    )
                };
            });

            return {
                status: 'ok',
                data: results,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total: filteredApartments.length,
                    totalPages: Math.ceil(filteredApartments.length / limit)
                }
            };

        } catch (error) {
            console.error('Error in findNearbyApartments:', error);
            throw new HttpException('Error searching apartments', 500);
        }
    }

    private toRad(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371;
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
