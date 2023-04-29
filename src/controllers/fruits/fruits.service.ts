import { FruitImage } from './entities/FruitImages.entity';
import { FruitVitamin } from './entities/FruitVitamins.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFruitDto } from './dto/create-fruit.dto';
import { UpdateFruitDto } from './dto/update-fruit.dto';
import { Fruit } from './entities/Fruit.entity';
import { FruitMineral } from './entities/FruitMineral.entity';
import { FruitCategory } from './entities/FruitCategory.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Category } from '../categories/entities/category.entity';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class FruitsService {

  constructor(
    @InjectRepository(Fruit) private readonly repo: Repository<Fruit>,
    @InjectRepository(FruitVitamin) private readonly FruitVitamin: Repository<FruitVitamin>,
    @InjectRepository(FruitMineral) private readonly FruitMineral: Repository<FruitMineral>,
    @InjectRepository(FruitCategory) private readonly FruitCategory: Repository<FruitCategory>,
    @InjectRepository(FruitImage) private readonly FruitImage: Repository<FruitImage>,
    @InjectRepository(Vitamin) private readonly vitamin: Repository<Vitamin>,
    @InjectRepository(Mineral) private readonly mineral: Repository<Mineral>,
    @InjectRepository(Category) private readonly category: Repository<Category>,
  ) {

  }
  async create(createFruitDto: CreateFruitDto) {
    const fruit = new Fruit()
    try {
      Object.assign(fruit, createFruitDto)

      this.repo.create(fruit);
      let savedFruitData = await this.repo.save(fruit);

      /* if (createFruitDto?.images) {
        createFruitDto?.images.forEach(async element => {
          let image = {
            fruitId: savedFruitData.id,
            imageName: element,
          }

          this.FruitImage.create(image);
          await this.FruitImage.save(image);
        });
      } */

      return savedFruitData;

    } catch (ex) {
      console.log("Some error occurred during saving Fruit data")
      console.log(ex)
    }

  }

  async saveVitaminData(fruitId, vitaminId) {
    const fruitVitamin = new FruitVitamin();
    console.log(fruitId, vitaminId)
    let vitaminData = {
      fruitId: fruitId,
      vitaminsId: vitaminId
      // image: createFruitDto.images
    }
    try {
      Object.assign(FruitVitamin, vitaminData)

      this.FruitVitamin.create(fruitVitamin)
      this.FruitVitamin.insert(fruitVitamin);
      return "vitamin data saved"

    } catch (ex) {
      return ex
    }

  }

  async saveMineralData(fruitId, mineralId) {
    const fruitMineral = new FruitMineral();
    let mineralData = {
      fruitId: fruitId,
      mineralsId: mineralId
      // image: createFruitDto.images
    }
    try {
      Object.assign(FruitMineral, mineralData)

      this.FruitMineral.create(fruitMineral)
      let data = this.FruitMineral.insert(fruitMineral);
      console.log("MIneral data" + data)

    } catch (ex) {
      console.log(ex)
    }

  }

  async saveFruitImages(files, fruitId?) {
    console.log("in save fruit images")
    try {
      files.forEach(file => {
        let images = new FruitImage();

        // console.log("\n" + file.originalname + "\n")
        let fileReponse = {
          fruitId: fruitId,
          imageName: file.originalname,
        };
        Object.assign(images, fileReponse)
        this.FruitImage.create(images)
        this.FruitImage.save(images)

      });

    } catch (ex) {
      console.log("This is error :" + ex)
      // return ex
    }

  }

  async findAll(query?: string) {

    const myQuery = await this.repo.find()

    return myQuery;

  }

  async findOne(id: number) {
    try {
      const fruit = await this.repo.findOne({ where: { id: (id) } });
      return fruit;
    } catch (err) {
      throw new BadRequestException('Fruit not found');
    }
  }

  async findByVitamin(vitaminsId: number) {
    try {
      const fruit = await this.FruitVitamin.findOne({ where: { vitaminsId: (vitaminsId) } });
      return fruit;
    } catch (err) {
      throw new BadRequestException(`Fruit with vitaminId ${vitaminsId} not found`);
    }
  }

  /* async findByMineral(mineralsId: string) {
    const mineral = new FruitMineral();

    try {
      const fruit = await this.FruitMineral.findOne({ mineralsId });
      return fruit;
    } catch (err) {
      throw new BadRequestException(`Fruit with slug ${mineralsId} not found`);
    }
  } */

  async update(id: number, updateFruitDto: UpdateFruitDto) {
    const fruit = await this.repo.findOne({ where: { id: (id) } });

    if (!fruit) {
      throw new BadRequestException('post not found');
    }

    fruit.modifiedOn = new Date(Date.now());

    Object.assign(fruit, updateFruitDto);
    return this.repo.save(fruit);
  }

  async remove(id: number) {
    const fruit = await this.repo.findOne({ where: { id: (id) } });
    await this.repo.remove(fruit);
    return { success: true, fruit };
  }
}
