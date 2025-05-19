import { Booking } from "../entities/booking.entity";

export interface CreateBookingResponse {
    status: string;
    message: string;
    statusCode: number;
}

export interface GetBookingsResponse {
    status: string;
    message: string;
    data: Booking[];
    statusCode: number;
}