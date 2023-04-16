import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export class OrderAddress {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  addressName: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  addressLine: string;
}


@Schema()
export class Order {
  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true, type: OrderAddress })
  orderAddress: OrderAddress;

  @Prop({ required: true })
  products: [{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }];

  @Prop({ required: true })
  orderDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
