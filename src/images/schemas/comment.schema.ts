import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

import { Image } from "./image.schema";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  user: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image' })
  image: Image
}

export const CommentSchema = SchemaFactory.createForClass(Comment);