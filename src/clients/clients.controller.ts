import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { CreateClientResponse } from './interfaces/client.interfaces';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService
  ) { }

  @Post('createClient')
  async createClient(
    @Body() createClientDto: CreateClientDto,
  ): Promise<CreateClientResponse> {
    try {
      return this.clientsService.createClient(createClientDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error(`Error in createClient: ${error}`);
    }
  }
}
