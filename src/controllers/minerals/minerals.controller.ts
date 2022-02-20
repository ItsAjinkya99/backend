import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MineralsService } from './minerals.service';
import { CreateMineralDto } from './dto/create-mineral.dto';
import { UpdateMineralDto } from './dto/update-mineral.dto';

@Controller('minerals')
export class MineralsController {
  constructor(private readonly mineralsService: MineralsService) {}

  @Post()
  create(@Body() createMineralDto: CreateMineralDto) {
    return this.mineralsService.create(createMineralDto);
  }

  @Get()
  findAll() {
    return this.mineralsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mineralsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMineralDto: UpdateMineralDto) {
    return this.mineralsService.update(+id, updateMineralDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mineralsService.remove(+id);
  }
}
