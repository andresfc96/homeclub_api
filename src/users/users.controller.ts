import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  CreateUserResponse,
  GetUserByIdResponse,
  GetUsersResponse,
} from './interfaces/user.interfaces';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    try {
      return this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new Error(`Error in createUser: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUsers')
  async getUsers(): Promise<GetUsersResponse> {
    try {
      return this.usersService.getUsers();
    } catch (error) {
      throw new Error(`Error in getUsers: ${error}`);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUserById/:id')
  async getUserById(@Param('id') id: string): Promise<GetUserByIdResponse> {
    try {
      return this.usersService.getUserById(id);
    } catch (error) {
      throw new Error(`Error in getUserById: ${error}`);
    }
  }

}