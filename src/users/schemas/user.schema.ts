import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsString()
  lname: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop({ required: true })
  @IsNumber()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
