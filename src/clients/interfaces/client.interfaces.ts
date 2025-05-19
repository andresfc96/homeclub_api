import { Client } from "../entities/client.entity";


export interface CreateClientResponse {
    status: string;
    message: string;
    statusCode: number;
    data?: any;
}

export interface GetClientsResponse {
    status: string;
    message: string;
    data: Client[];
    statusCode: number;
}

export interface GetClientByIdResponse {
    status: string;
    message: string;
    data: Client;
    statusCode: number;
}

export interface GetClientByEmailResponse {
    status: string;
    message: string;
    data: Client;
    statusCode: number;
}