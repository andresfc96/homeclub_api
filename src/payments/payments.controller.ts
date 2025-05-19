import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePaymentResponse } from './interfaces/payment.interfaces';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Post('createPayment')
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<CreatePaymentResponse> {
    try {
      return this.paymentsService.createPayment(createPaymentDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Error in createPayment: ${error}`);
    }
  }
}
