import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCartItemDto {
  @ApiProperty({
    description: 'The product id',
    example: '5f9f1c9b9c9d1c0b3c8b4b5c',
  })
  @IsString()
  @IsMongoId()
  productId: string;

  @ApiProperty({
    description: 'The quantity of the product',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;
}
