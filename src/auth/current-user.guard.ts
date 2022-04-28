import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CurrentUserGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (user) return user;
    return null;
  }
}
