import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import * as mongoose from 'mongoose';

import { ImageService } from "./image.service";
import { CreateImageDto } from "./dto/create-image.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { FileService } from "../file/file.service";

@Controller('/api/images')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 }
  ]))
  async createImage(@Body() dto: CreateImageDto, @UploadedFiles() files) {
    const { image } = files;

    return this.imageService.createImage(dto, image);
  }

  @Get()
  getAllImages() {
    return this.imageService.getAllImages();
  }

  @Get('/:image_id')
  getImageById(@Param('image_id') image_id: mongoose.Schema.Types.ObjectId) {
    return this.imageService.getImageById(image_id);
  }

  @Delete('/:image_id')
  deleteImage(@Param('image_id') image_id: mongoose.Schema.Types.ObjectId) {
    return this.imageService.deleteImage(image_id);
  }

  @Post('/comments')
  addComment(@Body() dto: CreateCommentDto) {
    return this.imageService.addComment(dto);
  }
}