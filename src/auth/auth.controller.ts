import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './interfaces/auth.interfaces';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    try {
      return this.authService.login(loginDto);
    } catch (error) {
      throw new UnauthorizedException('Error in login', error);
    }
  }
}