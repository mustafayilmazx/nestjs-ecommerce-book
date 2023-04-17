import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    type: String,
    description: 'The id of the address that the order will be delivered to',
    example: '5f9f1c9b9c9d1c0b8c8b8b8b',
  })
  @IsMongoId()
  addressId: string;
}
