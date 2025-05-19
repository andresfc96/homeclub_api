import { BadRequestException, ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaDb1Service } from 'prisma/db1/prisma-db1.service';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateClientResponse } from './interfaces/client.interfaces';

@Injectable()
export class ClientsService {
    constructor(
        private prismaDb1Service: PrismaDb1Service
    ) { }

    async createClient(createClientDto: CreateClientDto): Promise<CreateClientResponse> {
        try {

            const existingClient = await this.prismaDb1Service.client.findUnique({
                where: { email: createClientDto.email }
            });

            if (existingClient) {
                throw new ConflictException('Email already registered');
            }

            const newClient = await this.prismaDb1Service.client.create({
                data: {
                    firstName: createClientDto.firstName,
                    lastName: createClientDto.lastName,
                    email: createClientDto.email
                }
            });

            return {
                status: 'ok',
                message: 'Client created successfully',
                statusCode: 201,
                data: newClient
            };
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
            ) {
                throw error;
            } else {
                throw new HttpException('Failed to create Client', 500);
            }
        }
    }
}
