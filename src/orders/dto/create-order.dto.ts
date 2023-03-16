// there a a dto includes the data that we need to create an order
// and we can use the validation pipe to validate the data
// totalPrice float, required and positive number
// address object, required and reference to the address schema
// products array includes {product,price}, required and reference to the product schema
// status enum, required and default value is 'pending'

import { Type } from 'class-transformer';
import {
  IsEnum,
  IsFloat,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';
import { ProductDto } from './product.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsFloat()
  totalPrice: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ProductDto)
  products: ProductDto[];

  @IsOptional()
  @IsEnum(['pending', 'paid', 'shipped', 'delivered'])
  status: string;
}
