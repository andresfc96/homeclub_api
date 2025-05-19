import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateRateDto {
    @IsNumber()
    apartmentId: number;

    @IsDate()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    monthlyRate?: number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    dailyRate?: number;
}