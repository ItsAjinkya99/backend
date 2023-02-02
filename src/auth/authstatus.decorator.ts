import { createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const AuthStatus = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const allowUnauthorizedRequest = Reflect.getMetadata('allowUnauthorizedRequest', ctx.getClass())
    return request.user || allowUnauthorizedRequest;
  },
);