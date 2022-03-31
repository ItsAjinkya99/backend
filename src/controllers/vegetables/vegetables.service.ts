import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Vegetable_Category } from './entities/vegetable_category.entity';
import { Vegetable_mineral } from './entities/vegetable_mineral.entity';
import { Vegetable_vitamin } from './entities/vegetable_vitamin.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';

@Injectable()
export class VegetablesService {

  constructor(
    @InjectRepository(Vegetable_vitamin) private readonly vegetableVitamin: Repository<Vegetable_vitamin>,
    @InjectRepository(Vegetable_mineral) private readonly vegetableMineral: Repository<Vegetable_mineral>,
    @InjectRepository(Vegetable_Category) private readonly vegetableCategory: Repository<Vegetable_Category>,
    // @InjectRepository(Fruit_Image) private readonly image: Repository<Fruit_Image>,
    @InjectRepository(Vitamin) private readonly vitamin: Repository<Vitamin>,
    @InjectRepository(Mineral) private readonly mineral: Repository<Mineral>,
    @InjectRepository(Category) private readonly category: Repository<Category>) {

  }

  create(createVegetableDto: CreateVegetableDto) {
    return 'This action adds a new vegetable';
  }

  findAll() {
    return `This action returns all vegetables`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vegetable`;
  }

  update(id: number, updateVegetableDto: UpdateVegetableDto) {
    return `This action updates a #${id} vegetable`;
  }

  remove(id: number) {
    return `This action removes a #${id} vegetable`;
  }
}
