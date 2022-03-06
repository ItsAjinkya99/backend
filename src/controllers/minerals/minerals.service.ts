import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMineralDto } from './dto/create-mineral.dto';
import { UpdateMineralDto } from './dto/update-mineral.dto';
import { Mineral } from './entities/mineral.entity';

@Injectable()
export class MineralsService {
  constructor(
    @InjectRepository(Mineral) private readonly mineral: Repository<Mineral>,

  ) {

  }


  async create(createMineralDto: CreateMineralDto) {


    const mineral = new Mineral();
    Object.assign(mineral, createMineralDto)

    return await this.mineral.save(mineral);
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
