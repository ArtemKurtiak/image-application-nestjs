import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";
import { Image, ImageSchema } from "./schemas/image.schema";
import { Comment, CommentSchema } from "./schemas/comment.schema";
import { FileService } from "../file/file.service";
import { User, UserSchema } from "../user/schemas/User.schema";

@Module({
  controllers: [ImageController],
  providers: [ImageService, FileService],
  imports: [
    MongooseModule.forFeature([
      { name: Image.name, schema: ImageSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema }
    ]),
  ]
})
export class ImageModule {
}