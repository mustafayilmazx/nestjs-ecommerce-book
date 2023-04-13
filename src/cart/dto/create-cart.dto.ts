import { IsMongoId, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsMongoId()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
