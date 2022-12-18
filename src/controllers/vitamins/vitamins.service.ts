import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVitaminDto } from './dto/create-vitamin.dto';
import { UpdateVitaminDto } from './dto/update-vitamin.dto';
import { Vitamin } from './entities/vitamin.entity';

@Injectable()
export class VitaminsService {

  constructor(
    @InjectRepository(Vitamin) private readonly vitamin: Repository<Vitamin>,

  ) {

  }

  async create(createVitaminDto: CreateVitaminDto) {
    const vitamin = new Vitamin();
    Object.assign(vitamin, createVitaminDto)

    return await this.vitamin.save(vitamin);

    // return 'This action adds a new vitamin';
  }

  async findAll() {
    const myQuery = this.vitamin
      .createQueryBuilder('vitamin')
      .select('id', 'name')
    return await myQuery.getMany();

  }

  async findOne(id: number) {
    try {
      const vitamin = await this.vitamin.findOneOrFail({where:{id: id}});
      return vitamin;
    } catch (err) {
      throw new BadRequestException('Vitamin not found');
    }
  }

  async update(id: number, updateVitaminDto: UpdateVitaminDto) {
    const fruit = await this.vitamin.findOne({where:{id: id}});

    if (!fruit) {
      throw new BadRequestException('post not found');
    }

    // vitamin.modifiedOn = new Date(Date.now());

    Object.assign(fruit, updateVitaminDto);
    return this.vitamin.save(fruit);
  }

  remove(id: number) {
    return `This action removes a #${id} vitamin`;
  }
}
