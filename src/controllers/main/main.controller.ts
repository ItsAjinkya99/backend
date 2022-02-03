import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MainService } from './main.service';


@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Post()
  create() {
    return this.mainService.create();
  }

  @Get()
  findAll() {
    return this.mainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.mainService;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainService.remove(+id);
  }
}
