import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { CreateRateResponse } from './interfaces/rate.interfaces';
import {
  ConflictException,
} from '@nestjs/common';

@Controller('rates')
export class RatesController {
  constructor(
    private readonly ratesService: RatesService
  ) { }

  @Post('createRate')
  async createRate(
    @Body() createRateDto: CreateRateDto,
  ): Promise<CreateRateResponse> {
    try {
      return this.ratesService.createRate(createRateDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Error in createRate: ${error}`);
    }
  }
}