import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CorrectDescriptionPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const valueLength = value.description?.split(' ')?.length;

    if (value.description && !(valueLength >= 2)) {
      throw new HttpException('Description must be minimum 2 words length', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}