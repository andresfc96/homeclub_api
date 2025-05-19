import { Booking } from "src/bookings/entities/booking.entity";

export enum PaymentConcept {
    Rent = 'Rent',
    Service_fee = 'Service_fee',
    Booking_fee = 'Booking_fee'
}

export class Payment {
    id: number;
    bookingId: number;
    concept: PaymentConcept;
    amount: number;
    createdAt: Date;
}