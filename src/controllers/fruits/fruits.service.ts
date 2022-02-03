import { Fruit_vitamin } from './entities/fruit_vitamins.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { Fruit } from './entities/fruit.entity';
import { Fruit_Mineral } from './entities/fruit_mineral.entity';
import { Fruit_Category } from './entities/fruit_category.entity';

@Injectable()
export class FruitsService {

  constructor(
    @InjectRepository(Fruit) private readonly repo: Repository<Fruit>,
    @InjectRepository(Fruit_vitamin) private readonly vitamin: Repository<Fruit_vitamin>,
    @InjectRepository(Fruit_Mineral) private readonly mineral: Repository<Fruit_Mineral>,
    @InjectRepository(Fruit_Category) private readonly category: Repository<Fruit_Category>,
  ) {

  }
  async create(createFruitDto: CreateFruitDto) {
    const fruit = new Fruit();
    const vitamin = new Fruit_vitamin();
    const mineral = new Fruit_Mineral();
    const category = new Fruit_Category();

    let vitaminData = {
      name: createFruitDto.name,
      vitaminsId: createFruitDto.vitaminsId
    }

    let fruitData = {
      name: createFruitDto.name,
      image: createFruitDto.image
    }

    Object.assign(vitamin, vitaminData)
    Object.assign(fruit, fruitData)

    this.repo.create([fruit, vitamin]);
    return await this.repo.save([fruit, vitamin]);
  }

  async findAll(query?: string) {
    const myQuery = this.repo
      .createQueryBuilder('fruit')
      .select('id', 'name')

    // check if query is present
    /* if (!(Object.keys(query).length === 0) && query.constructor === Object) {
      const queryKeys = Object.keys(query); // get the keys of the query string

      // check if slug key is present
      if (queryKeys.includes('slug')) {
        myQuery.where('post.slug LIKE :slug', { slug: `%${query['slug']}%` });
      }
      // check if sort key is present, we will sort by Title field only
      if (queryKeys.includes('sort')) {
        myQuery.orderBy('post.title', query['sort'].toUpperCase());
      }

      // check if category is present, show only selected category items
      if (queryKeys.includes('category')) {
        myQuery.andWhere('category.title = :cat', { cat: query['category'] });
      }

      return await myQuery.getMany();
    } else { */
      return await myQuery.getMany();
    // }

  }

  async findOne(id: number) {
    try {
      const fruit = await this.repo.findOneOrFail(id);
      return fruit;
    } catch (err) {
      throw new BadRequestException('Fruit not found');
    }
  }

  async findByVitamin(vitaminsId: string) {
    const vitamin = new Fruit_vitamin();
    try {
      const fruit = await this.vitamin.findOne({ vitaminsId });
      return fruit;
    } catch (err) {
      throw new BadRequestException(`Fruit with vitaminId ${vitaminsId} not found`);
    }
  }

  async findByMineral(mineralsId: string) {
    const mineral = new Fruit_Mineral();

    try {
      const fruit = await this.mineral.findOne({ mineralsId });
      return fruit;
    } catch (err) {
      throw new BadRequestException(`Fruit with slug ${mineralsId} not found`);
    }
  }

  async update(id: number, updateFruitDto: UpdateFruitDto) {
    const fruit = await this.repo.findOne({ id });

    if (!fruit) {
      throw new BadRequestException('post not found');
    }

    fruit.modifiedOn = new Date(Date.now());
    /* fruit.mineralsId = updateFruitDto.vitaminsId;
    fruit.vitaminsId = updateFruitDto.mineralsId; */

    Object.assign(fruit, updateFruitDto);
    return this.repo.save(fruit);
  }

  async remove(id: number) {
    const fruit = await this.repo.findOne(id);
    await this.repo.remove(fruit);
    return { success: true, fruit };
  }
}
