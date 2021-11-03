import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";
import * as mongoose from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: '' })
  url: string;

  @Prop({})
  user: string

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[]
}

export const ImageSchema = SchemaFactory.createForClass(Image);