import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class CheckUserAgeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { age } = context.switchToHttp().getRequest().body;

    return age >= 18;
  }
}