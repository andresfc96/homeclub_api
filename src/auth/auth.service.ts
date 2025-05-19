import {
    HttpException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { LoginResponse } from './interfaces/auth.interfaces';
  import { LoginDto } from './dto/login.dto';
  import { ConfigService } from '@nestjs/config';
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcryptjs';
import { PrismaDb3Service } from 'prisma/db3/prisma-db3.service';
  
  @Injectable()
  export class AuthService {
    constructor(
      private prismaService: PrismaDb3Service,
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
  
    async validateUser(username: string, password: string): Promise<any> {
      const user = await this.prismaService.user.findUnique({
        where: { username },
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        return user;
      }
      return null;
    }
  
    async login(loginDto: LoginDto): Promise<LoginResponse> {
      try {
        const user = await this.prismaService.user.findUnique({
          where: {
            username: loginDto.username,
          },
        });
  
        if (user !== undefined && user !== null) {
          const isMatch = await bcrypt.compare(loginDto.password, user.password);
          if (isMatch) {
            const payload = {
              username: user.username,
              sub: loginDto.username,
            };
  
            const expiresIn = this.configService.get<string>(
              'JWT_EXPIRATION_TIME',
            );
  
            const token = this.jwtService.sign(payload, {
              secret: process.env.JWT_SECRET,
              expiresIn,
            });
  
            await this.prismaService.user.update({
              where: {
                id: user.id,
              },
              data: {
                token: token,
              },
            });
  
            return {
              status: 'ok',
              message: 'Login successful',
              token: token,
              statusCode: 200,
            };
          } else {
            throw new UnauthorizedException('Invalid credentials');
          }
        } else {
          throw new UnauthorizedException('Invalid credentials');
        }
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          throw error;
        } else {
          throw new HttpException('Failed to login', 500);
        }
      }
    }
  }