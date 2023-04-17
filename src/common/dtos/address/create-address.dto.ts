import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'The address line of the user',
    example: 'Ataturk Street No: XX',
  })
  @IsNotEmpty()
  @IsString()
  addressLine: string;

  @ApiProperty({
    description: 'The address name of the user',
    example: 'Home',
  })
  @IsNotEmpty()
  @IsString()
  addressName: string;

  @ApiProperty({
    description: 'The city of the user',
    example: 'Istanbul',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: 'The district of the user',
    example: 'Kadikoy',
  })
  @IsNotEmpty()
  @IsString()
  district: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '05555555555',
  })
  @IsNotEmpty()
  @IsPhoneNumber('TR')
  phone: string;

  @ApiProperty({
    description: 'The postal code of the user',
    example: '34000',
  })
  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The surname of the user',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  surname: string;
}
