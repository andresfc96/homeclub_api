import { Apartment } from "../entities/apartment.entity";


export interface CreateApartmentResponse {
  status: string;
  message: string;
  statusCode: number;
  data?: any;
}

export interface GetApartmentsResponse {
  status: string;
  message: string;
  data: Apartment[];
  statusCode: number;
}

export interface NearbyApartment {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: string;
  currentRate?: number;
  description?: string;
  imageUrl?: string;
  distance: number;
}

export interface NearbyApartmentsResponse {
  status: string;
  data: NearbyApartment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}