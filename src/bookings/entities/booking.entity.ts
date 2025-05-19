import { Rate } from "src/rates/entities/rate.entity";
import { Apartment } from "../../apartments/entities/apartment.entity";
import { Client } from "../../clients/entities/client.entity";
import { Payment } from "src/payments/entities/payment.entity";

export enum BookingStatus {
    Active = 'Active',
    Cancelled = 'Cancelled',
  }

export class Booking {
    id: number;
    code: string;
    apartment: Apartment;
    apartmentId: number;
    client: Client;
    clientId: number;
    startDate: Date;
    endDate: Date;
    status: BookingStatus;
    payments?: Payment[];
    corporateRate?: Rate;
    corporateRateId?: number;
    touristRate?: Rate;
    touristRateId?: number;
  }