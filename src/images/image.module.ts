import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { Image } from './schemas/image.schema';
import { Comment } from './schemas/comment.schema';
import { ImageSchema } from "./schemas/image.schema";
import { CommentSchema } from "./schemas/comment.schema";
import { FileService } from "../file/file.service";

@Module({
  controllers: [ImageController],
  providers: [ImageService, FileService],
  imports: [
    MongooseModule.forFeature([
      { name: Image.name, schema: ImageSchema },
      { name: Comment.name, schema: CommentSchema }
    ]),
  ]
})
export class ImageModule {

}