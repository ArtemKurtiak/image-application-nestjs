import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Image, ImageDocument } from "../schemas/image.schema";
import { Model } from "mongoose";
import { Observable } from "rxjs";


@Injectable()
export class checkImageExistsInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    try {
      const { image_id } = context.switchToHttp().getRequest().params;

      const image = await this.imageModel.findById(image_id);

      if (!image) {
        throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
      }

      return next.handle();
    } catch (e) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
  }
}