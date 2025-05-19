import { Rate } from "../entities/rate.entity";

export interface CreateRateResponse {
    status: string;
    message: string;
    statusCode: number;
    data?: any;
}

export interface GetRatesResponse {
    status: string;
    message: string;
    data: Rate[];
    statusCode: number;
}
