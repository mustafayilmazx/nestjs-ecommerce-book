import { Expose } from 'class-transformer';

export class CartItemDao {
  @Expose()
  productId: string;

  @Expose()
  quantity: number;

  @Expose()
  productName: string;

  @Expose()
  price: number;
}
