import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  surname: string;

  @Prop({ required: true })
  @IsNumber()
  phone: string;

  @Prop({ required: true })
  @IsString()
  addressName: string;

  @Prop({ required: true })
  @IsString()
  city: string;

  @Prop({ required: true })
  @IsString()
  district: string;

  @Prop({ required: true })
  @IsNumber()
  postalCode: string;

  @Prop({ required: true })
  @IsString()
  addressLine: string;

  @Prop({ required: true })
  @IsString()
  ownerId: string;

  @Prop({ required: false })
  isDeleted: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
