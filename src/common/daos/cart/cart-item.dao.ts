import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CartItemDao {
  @ApiProperty({
    description: 'The id of the product',
    example: '5f9f1c9b9c9c9c9c9c9c9c9c',
  })
  @Expose()
  productId: string;

  @ApiProperty({
    description: 'The quantity of the product',
    example: 1,
  })
  @Expose()
  quantity: number;

  @ApiProperty({
    description: 'The name of the product',
    example: 'Product name',
  })
  @Expose()
  productName: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 100,
  })
  @Expose()
  price: number;
}
