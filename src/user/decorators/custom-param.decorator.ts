import { createParamDecorator, ExecutionContext } from "@nestjs/common";


export const CustomParam = createParamDecorator((data: any, input: ExecutionContext) => {
  const params = input.switchToHttp().getRequest().params;

  return params[data];
})