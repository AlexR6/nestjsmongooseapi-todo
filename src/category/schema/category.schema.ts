import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category &
  Document;

@Schema()
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  color: string;

  @Prop({ type: String })
  userId: string;
}

export const CategorySchema =
  SchemaFactory.createForClass(Category);
