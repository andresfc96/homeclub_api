import { Payment } from "../entities/payment.entity";

export interface CreatePaymentResponse {
    status: string;
    message: string;
    statusCode: number;
    data: Payment;
}