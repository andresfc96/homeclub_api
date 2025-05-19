import { IsEnum, IsNumber, IsPositive } from "class-validator";
import { PaymentConcept } from "../entities/payment.entity";


export class CreatePaymentDto {
    @IsNumber()
    bookingId: number;

    @IsEnum(PaymentConcept)
    concept: PaymentConcept;

    @IsNumber()
    @IsPositive()
    amount: number;
}