import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VitaminsService } from './vitamins.service';
import { CreateVitaminDto } from './dto/create-vitamin.dto';
import { UpdateVitaminDto } from './dto/update-vitamin.dto';

@Controller('vitamins')
export class VitaminsController {
  constructor(private readonly vitaminsService: VitaminsService) {}

  @Post()
  create(@Body() createVitaminDto: CreateVitaminDto) {
    return this.vitaminsService.create(createVitaminDto);
  }

  @Get()
  findAll() {
    return this.vitaminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vitaminsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVitaminDto: UpdateVitaminDto) {
    return this.vitaminsService.update(+id, updateVitaminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vitaminsService.remove(+id);
  }
}
