import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
// import { vegetableCategory } from './entities/VegetableCategory.entity';
import { VegetableMineral } from './entities/VegetableMineral.entity';
import { VegetableVitamin } from './entities/VegetableVitamin.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';
import { VegetableImage } from './entities/VegetableImages.entity';
import { Vegetable } from './entities/Vegetable.entity';
import { vegetableCategory } from './entities/VegetableCategory.entity';

@Injectable()
export class VegetablesService {

  constructor(
    @InjectRepository(Vegetable) private readonly repo: Repository<Vegetable>,
    @InjectRepository(VegetableImage) private readonly vegetabeleImages: Repository<VegetableImage>,
    @InjectRepository(VegetableVitamin) private readonly VegetableVitamin: Repository<VegetableVitamin>,
    @InjectRepository(VegetableMineral) private readonly VegetableMineral: Repository<VegetableMineral>,
    @InjectRepository(vegetableCategory) private readonly vegetableCategory: Repository<vegetableCategory>,
    // @InjectRepository(fruitImage) private readonly image: Repository<fruitImage>,
    @InjectRepository(Vitamin) private readonly vitamin: Repository<Vitamin>,
    @InjectRepository(Mineral) private readonly mineral: Repository<Mineral>,
    @InjectRepository(Category) private readonly category: Repository<Category>) {

  }

  async create(createVegetableDto: CreateVegetableDto) {

    const vegetable = new Vegetable()
    try {
      Object.assign(vegetable, createVegetableDto)

      this.repo.create(vegetable);
      const savedFruitData = await this.repo.save(vegetable);

      if (createVegetableDto?.images) {
        createVegetableDto?.images.forEach(async element => {
          let image = {
            vegetableId: savedFruitData.id,
            imageName: element,
          }

          this.vegetabeleImages.create(image);
          await this.vegetabeleImages.save(image);
        });
      }

      return savedFruitData;

    } catch (ex) {
      console.log("Some error occurred during saving Fruit data")
      console.log(ex)
    }
  }

  async saveVitaminData(fruitId, vitaminId) {
    const vegVitamin = new VegetableVitamin;
    console.log(fruitId, vitaminId)
    let vitaminData = {
      fruitId: fruitId,
      vitaminsId: vitaminId
      // image: createFruitDto.images
    }
    try {
      Object.assign(VegetableVitamin, vitaminData)

      this.VegetableVitamin.create(vegVitamin)
      this.VegetableVitamin.insert(vegVitamin);
      return "vitamin data saved"

    } catch (ex) {
      return ex
    }

  }
  async saveMineralData(fruitId, mineralId) {
    const vegMineral = new VegetableMineral();
    let mineralData = {
      fruitId: fruitId,
      mineralsId: mineralId
      // image: createFruitDto.images
    }
    try {
      Object.assign(VegetableMineral, mineralData)

      this.VegetableMineral.create(vegMineral)
      let data = this.VegetableMineral.insert(vegMineral);
      console.log("MIneral data" + data)

    } catch (ex) {
      console.log(ex)
    }

  }

  async findAll(num: string) {

    const myQuery = await this.repo.query(`select * from Vegetable where approved = "${num}"`);
    return myQuery;
  }

  async findOne(id: number) {
    try {
      const vegetable = await this.repo.findOne({ where: { id: (id) } });
      return vegetable;
    } catch (err) {
      throw new BadRequestException('Vegetable not found');
    }
  }

  async update(id: number, updateVegetableDto: UpdateVegetableDto) {
    const vegetable = await this.repo.findOne({ where: { id: id } });

    if (!vegetable) {
      throw new BadRequestException('post not found');
    }

    vegetable.modifiedOn = new Date(Date.now());

    Object.assign(vegetable, updateVegetableDto);
    return this.repo.save(vegetable);
  }

  async remove(id: number) {
    const vegetable = await this.repo.findOneBy({ id: id });
    await this.repo.remove(vegetable);
    return { success: true, vegetable };
  }

  authorize(data: any) {
    data.forEach(async element => {
      const vegetable = await this.repo.findOne({ where: { id: element } });
      vegetable.approved = 1;
      this.repo.save(vegetable)
    });
    return true
  }
}
