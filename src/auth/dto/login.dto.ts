import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class LoginDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;
}