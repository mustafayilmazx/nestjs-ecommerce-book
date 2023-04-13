import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Cart {
  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
