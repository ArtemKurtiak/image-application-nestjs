import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema } from "mongoose";

import { Comment, CommentDocument } from "./schemas/comment.schema";
import { ImageDocument, Image } from "./schemas/image.schema";
import { CreateImageDto } from "./dto/create-image.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileService } from "../file/file.service";


@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService) {
  }

  async createImage(dto: CreateImageDto, picture: string): Promise<Image> {
    const fileName = await this.fileService.createFile(picture);

    const image = await this.imageModel.create({ ...dto, url: fileName });

    return image;
  }

  async getAllImages(): Promise<Image[]> {
    const images = await this.imageModel.find();

    return images;
  }

  async getImageById(id: Schema.Types.ObjectId): Promise<Image | null> {
    const image = await this.imageModel.findById(id).populate({
      path: 'user',
    }).populate({
      path: 'comments',
      populate: {
        path: 'user'
      }
    });

    return image;
  }

  async deleteImage(id: Schema.Types.ObjectId): Promise<void> {
    await this.imageModel.deleteOne({ _id: id });
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const { image } = dto;

    const comment = await this.commentModel.create({ ...dto });

    await this.imageModel.findByIdAndUpdate(image, {
      $push: {
        comments: [comment._id]
      }
    });

    return comment;
  }

  async getLimitImages(limit: number): Promise<Image[]> {
    const images = await this.imageModel.find({}).limit(limit);

    return images;
  }
}