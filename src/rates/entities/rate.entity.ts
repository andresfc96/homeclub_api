import { IsNumber, IsDate, IsPositive, IsOptional } from 'class-validator';

export class Rate {
  @IsNumber()
  id: number;

  @IsNumber()
  apartmentId: number;

  @IsDate()
  startDate: Date;

  @IsDate()
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