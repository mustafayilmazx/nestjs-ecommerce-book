// there a a dto includes the data that we need to create an order
// and we can use the validation pipe to validate the data
// totalPrice float, required and positive number
// address object, required and reference to the address schema
// products array includes {product,price}, required and reference to the product schema
// status enum, required and default value is 'pending'

import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @ValidateNested()
  address: string;

  @IsNotEmpty()
  @ValidateNested()
  products: string[];

  @IsOptional()
  @IsEnum(['pending', 'paid', 'shipped', 'delivered'])
  status: string;
}
