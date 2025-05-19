import { IsNotEmpty, IsNumber, IsDateString, IsOptional, IsEnum, IsPositive } from "class-validator";
import { BookingStatus } from "../entities/booking.entity";

export class CreateBookingDto {
    @IsNumber()
    @IsPositive()
    apartmentId: number;

    @IsNumber()
    @IsPositive()
    clientId: number;

    @IsDateString()
    @IsNotEmpty()
    startDate: string;

    @IsDateString()
    @IsNotEmpty()
    endDate: string;

    @IsOptional()
    @IsEnum(BookingStatus)
    status?: BookingStatus;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    corporateRateId?: number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    touristRateId?: number;
}