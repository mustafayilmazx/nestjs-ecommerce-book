import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class AddProductToCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
