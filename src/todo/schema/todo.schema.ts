import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  userId: string;

  @Prop({ default: 1 })
  active: number;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date })
  endAt: Date;

  @Prop({ type: String })
  categoryId: string;
}

export const TodoSchema =
  SchemaFactory.createForClass(Todo);
