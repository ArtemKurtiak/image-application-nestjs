import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { CheckUserAgeGuard } from "./guards/check-user-age.guard";


@Controller('/api/auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @UseGuards(CheckUserAgeGuard)
  registerUser(@Body() dto: RegisterUserDto) {
    return this.userService.registerUser(dto);
  }
}