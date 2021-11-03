import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Observable } from 'rxjs';
import { User, UserDocument } from "../../user/schemas/User.schema";
import { Model } from "mongoose";

@Injectable()
export class checkUserExistsInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    try {
      const { user } = context.switchToHttp().getRequest().body;

      const userExists = await this.userModel.findById(user);

      if (!userExists) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND)
      }

      return next.handle();
    } catch (e) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

  }
}