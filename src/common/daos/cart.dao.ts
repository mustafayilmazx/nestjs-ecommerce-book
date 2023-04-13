import { Expose, Type } from 'class-transformer';
import { CartItemDao } from './cart-item.dao';

export class CartDao {
  @Expose()
  totalPrice: number;

  @Expose()
  @Type(() => CartItemDao)
  items: CartItemDao[];
}
