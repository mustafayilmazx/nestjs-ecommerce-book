import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  lname?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsNumber()
  phone?: string;
}
