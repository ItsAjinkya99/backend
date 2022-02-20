import { Injectable } from '@nestjs/common';
import { CreateMineralDto } from './dto/create-mineral.dto';
import { UpdateMineralDto } from './dto/update-mineral.dto';

@Injectable()
export class MineralsService {
  create(createMineralDto: CreateMineralDto) {
    return 'This action adds a new mineral';
  }

  findAll() {
    return `This action returns all minerals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mineral`;
  }

  update(id: number, updateMineralDto: UpdateMineralDto) {
    return `This action updates a #${id} mineral`;
  }

  remove(id: number) {
    return `This action removes a #${id} mineral`;
  }
}
