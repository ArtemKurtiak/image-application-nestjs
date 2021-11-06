import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User, UserSchema } from "./schemas/User.schema";
import { ChatGateway } from "./chat.gateway";

@Module({
  controllers: [UserController],
  providers: [UserService, ChatGateway],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema
      }
    ])
  ]
})
export class UserModule {
}