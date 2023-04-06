import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  addressLine: string;

  @IsNotEmpty()
  @IsString()
  addressName: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  district: string;

  @IsNotEmpty()
  @IsPhoneNumber('TR')
  phone: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;
}
