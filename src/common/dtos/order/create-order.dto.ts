import {
  IsMongoId
} from 'class-validator';

export class CreateOrderDto {
  @IsMongoId()
  addressId: string;
}
