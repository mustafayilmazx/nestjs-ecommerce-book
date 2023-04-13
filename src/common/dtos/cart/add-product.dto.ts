import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddProductToCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
