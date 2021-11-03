import { Injectable } from "@nestjs/common";

import { RegisterUserDto } from "./dto/register-user.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/User.schema";
import { Model } from "mongoose";

@Injectable({})
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {
  }

  async registerUser(dto: RegisterUserDto) {
    const user = await this.userModel.create({ ...dto });

    return user;
  }
}