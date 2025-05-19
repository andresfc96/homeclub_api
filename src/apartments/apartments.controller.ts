import { Body, Controller, Post, NotFoundException, ConflictException, InternalServerErrorException, Get, Query, BadRequestException } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto, CreatePropertyInfoDto, GetNearbyApartmentsDto } from './dto/create-apartment.dto';
import { CreateApartmentResponse, GetApartmentsResponse, NearbyApartmentsResponse } from './interfaces/apartment.interfaces';
import { PrismaDb1Service } from 'prisma/db1/prisma-db1.service';

@Controller('apartments')
export class ApartmentsController {
  constructor(
    private readonly apartmentsService: ApartmentsService,
    private prismaDb1Service: PrismaDb1Service
  ) { }

  @Post('createApartment')
  async createApartment(
    @Body() createApartmentDto: CreateApartmentDto,
  ): Promise<CreateApartmentResponse> {
    try {
      return this.apartmentsService.createApartment(createApartmentDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Error in createApartment: ${error}`);
    }
  }

  @Post('createApartmentInfo')
  async createApartmentInfo(
    @Body() createPropertyInfoDto: CreatePropertyInfoDto,
  ): Promise<CreateApartmentResponse> {
    try {
      const existingApartment = await this.prismaDb1Service.apartment.findUnique({
        where: { id: createPropertyInfoDto.propertyCode },
      });

      if (!existingApartment) {
        throw new NotFoundException(
          `No apartment found with ID ${createPropertyInfoDto.propertyCode} in Database 1. Verify the property code.`,
        );
      }

      return this.apartmentsService.createApartmentInfo(createPropertyInfoDto);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Error in createApartment: ${error}`);
    }
  }

  @Get('getApartments')
  async getApartments(): Promise<GetApartmentsResponse> {
    try {
      return this.apartmentsService.getApartments();
    } catch (error) {
      throw new Error(`Error in getUsers: ${error}`);
    }
  }

  @Get('getNearbyApartments')
  async getNearbyApartments(
    @Query() params: GetNearbyApartmentsDto
  ): Promise<NearbyApartmentsResponse> {
    try {
      return await this.apartmentsService.findNearbyApartments(params);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error searching apartments');
    }
  }

}
