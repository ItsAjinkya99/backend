import { Controller, Get, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';

export const AllowUnauthorizedRequest = () => SetMetadata('allowUnauthorizedRequest', true);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
