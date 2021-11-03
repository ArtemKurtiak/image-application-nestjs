import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "./dto/register-user.dto";


@Controller('/api/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  registerUser(@Body() dto: RegisterUserDto) {
    return this.userService.registerUser(dto);
  }
}