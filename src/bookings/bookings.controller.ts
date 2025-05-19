import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CreateBookingResponse } from './interfaces/booking.interfaces';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) { }

  @Post('createBooking')
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<CreateBookingResponse> {
    try {
      return this.bookingsService.createBooking(createBookingDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Error in createBooking: ${error}`);
    }
  }

}
