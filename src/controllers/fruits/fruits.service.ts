import { Fruit_Image } from 'src/controllers/fruits/entities/fruit_images.entity';
import { Fruit_vitamin } from './entities/fruit_vitamins.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { Fruit } from './entities/fruit.entity';
import { Fruit_Mineral } from './entities/fruit_mineral.entity';
import { Fruit_Category } from './entities/fruit_category.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class FruitsService {

  constructor(
    @InjectRepository(Fruit) private readonly repo: Repository<Fruit>,
    @InjectRepository(Fruit_vitamin) private readonly fruitVitamin: Repository<Fruit_vitamin>,
    @InjectRepository(Fruit_Mineral) private readonly vitaminMineral: Repository<Fruit_Mineral>,
    @InjectRepository(Fruit_Category) private readonly vitaminCategory: Repository<Fruit_Category>,
    @InjectRepository(Fruit_Image) private readonly image: Repository<Fruit_Image>,
    @InjectRepository(Vitamin) private readonly vitamin: Repository<Vitamin>,
    @InjectRepository(Mineral) private readonly mineral: Repository<Mineral>,
    @InjectRepository(Category) private readonly category: Repository<Category>,
  ) {

  }
  async create(createFruitDto: CreateFruitDto) {
    const fruit = new Fruit();
    let images;
    if (createFruitDto.images) {
      images = createFruitDto.images
    }

    let fruitData = {
      name: createFruitDto.name,
      mainImage: createFruitDto.mainImage
    }

    console.log("finding vitamin")
    let findVitamin = await this.vitamin.findOneOrFail(parseInt(createFruitDto.vitaminsId));

    let findMineral = await this.mineral.findOneOrFail(parseInt(createFruitDto.mineralsId));


    console.log(findVitamin)

    if (findVitamin && findMineral) {

      try {
        Object.assign(fruit, fruitData)

        this.repo.create(fruit);

        let savedFruitData = await this.repo.save(fruit);
        this.saveVitaminData(savedFruitData.id, parseInt(createFruitDto.vitaminsId))
        this.saveMineralData(savedFruitData.id, parseInt(createFruitDto.mineralsId))
        return savedFruitData;
      } catch (ex) {
        console.log("Some error occured during saving Fruit data")
        console.log(ex)
      }

    }
  }

  async saveVitaminData(fruitId, vitaminId) {
    const fruitvitamin = new Fruit_vitamin();
    console.log(fruitId, vitaminId)
    let vitaminData = {
      fruitId: fruitId,
      vitaminsId: vitaminId
      // image: createFruitDto.images
    }
    try {
      Object.assign(fruitvitamin, vitaminData)

      this.fruitVitamin.create(fruitvitamin)
      this.fruitVitamin.insert(fruitvitamin);
      return "vitamin data saved"

    } catch (ex) {
      return ex
    }

  }
  async saveMineralData(fruitId, mineralId) {
    const fruitmineral = new Fruit_Mineral();
    console.log(fruitId, mineralId)
    let mineralData = {
      fruitId: fruitId,
      vitaminsId: mineralId
      // image: createFruitDto.images
    }
    try {
      Object.assign(fruitmineral, mineralData)

      this.vitaminMineral.create(fruitmineral)
      this.vitaminMineral.insert(fruitmineral);
      return "mineral data saved"

    } catch (ex) {
      return ex
    }

  }

  async saveFruitImages(files, fruitId?) {
    console.log(files, fruitId)
    try {
      files.forEach(file => {
        let images = new Fruit_Image();

        console.log("\n" + file.originalname + "\n")
        let fileReponse = {
          fruitId: fruitId,
          imageName: file.originalname,
        };
        Object.assign(images, fileReponse)
        this.image.create(images)
        this.image.save(images)

      });

    } catch (ex) {
      return ex
    }

  }

  async findAll(query?: string) {
    const myQuery = this.repo
      .createQueryBuilder('fruit')
      .select('id', 'name')

    return await myQuery.getMany();

  }

  async findOne(id: number) {
    try {
      const fruit = await this.repo.findOneOrFail(id);
      return fruit;
    } catch (err) {
      throw new BadRequestException('Fruit not found');
    }
  }

  async findByVitamin(vitaminsId: number) {
    try {
      const fruit = await this.fruitVitamin.findOne({ vitaminsId });
      return fruit;
    } catch (err) {
      throw new BadRequestException(`Fruit with vitaminId ${vitaminsId} not found`);
    }
  }

  async findByMineral(mineralsId: string) {
    const mineral = new Fruit_Mineral();

    try {
      const fruit = await this.vitaminMineral.findOne({ mineralsId });
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

    Object.assign(fruit, updateFruitDto);
    return this.repo.save(fruit);
  }

  async remove(id: number) {
    const fruit = await this.repo.findOne(id);
    await this.repo.remove(fruit);
    return { success: true, fruit };
  }
}
