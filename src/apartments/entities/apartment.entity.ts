export enum ApartmentType {
  Corporate = 'Corporate',
  Tourist = 'Tourist'
}

export class Apartment {
    id: number
    name: string;
    address: string;
    type: ApartmentType;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
  }