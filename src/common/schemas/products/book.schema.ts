import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true, unique: true })
  bookID: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  authors: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  average_rating: number;

  @Prop({ required: true })
  num_pages: number;

  @Prop({ required: true })
  ratings_count: number;

  @Prop({ required: true })
  text_reviews_count: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
