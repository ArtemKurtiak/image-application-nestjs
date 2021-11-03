import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';

import { Image } from "../../images/schemas/image.schema";

export type UserDocument = Document & User;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Image' }], default: [] })
  images: Image[]
}

export const UserSchema = SchemaFactory.createForClass(User);