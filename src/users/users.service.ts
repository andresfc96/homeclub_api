import {
    BadRequestException,
    ConflictException,
    HttpException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import {
    CreateUserResponse,
    GetUserByIdResponse,
    GetUsersResponse,
} from './interfaces/user.interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaDb3Service } from 'prisma/db3/prisma-db3.service';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaDb3Service) { }

    async createUser(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { username: createUserDto.username },
            });

            if (user) {
                throw new ConflictException(
                    `Username ${createUserDto.username} already exists.`,
                );
            }

            const hashedPassword = await this.encryptPassword(createUserDto.password);

            await this.prismaService.user.create({
                data: {
                    username: createUserDto.username,
                    password: hashedPassword
                },
            });

            return {
                status: 'ok',
                message: 'User created successfully',
                statusCode: 201,
            };
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
            ) {
                throw error;
            } else {
                throw new HttpException('Failed to create user', 500);
            }
        }
    }

    async getUsers(): Promise<GetUsersResponse> {
        try {
            const users = await this.prismaService.user.findMany({
                where: { status: 'ACTIVE' },
                orderBy: { username: 'asc' },
            });

            return {
                status: 'ok',
                message: 'Fetch users successfully',
                data: users,
                statusCode: 201,
            };
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
            ) {
                throw error;
            } else {
                throw new HttpException('Failed to fetch users', 500);
            }
        }
    }

    async getUserById(id: string): Promise<GetUserByIdResponse> {
        try {
            const user = await this.prismaService.user.findUnique({
                where: { id: Number(id) },
            });

            return {
                status: 'ok',
                message: 'Fetch user by id successfully',
                data: user,
                statusCode: 201,
            };
        } catch (error) {
            if (
                error instanceof BadRequestException ||
                error instanceof ConflictException
            ) {
                throw error;
            } else {
                throw new HttpException('Failed to fetch user', 500);
            }
        }
    }

    async encryptPassword(password: string): Promise<string> {
        try {
            const saltRounds = 10;
            return await bcrypt.hash(password, saltRounds);
        } catch (error) {
            throw new InternalServerErrorException(
                'An error occurred during password encryption',
                error,
            );
        }
    }
}