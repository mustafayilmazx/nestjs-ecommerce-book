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
