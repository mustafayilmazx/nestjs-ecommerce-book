import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The first name of the User',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The last name of the User',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lname: string;

  @ApiProperty({
    description: 'The email of the User',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: '12345678',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  password: string;

  @ApiProperty({
    description: 'The phone number of the User',
    example: '05314589625',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('TR')
  phone: string;
}
