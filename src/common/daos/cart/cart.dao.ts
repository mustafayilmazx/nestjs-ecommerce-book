import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CartItemDao } from './cart-item.dao';

export const products_example = [
  {
    productId: '5f9f1c9b9c9c9c9c9c9c9c9c',
    quantity: 1,
    productName: 'Product name',
    price: 100,
  },
];

export class CartDao {
  @ApiProperty({
    description: 'The total price of all products in the cart',
    example: 100,
  })
  @Expose()
  totalPrice: number;

  @ApiProperty({
    description: 'The list of products in the cart',
    example: products_example,
  })
  @Expose()
  @Type(() => CartItemDao)
  products: CartItemDao[];
}
