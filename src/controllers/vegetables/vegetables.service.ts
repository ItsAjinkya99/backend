import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { vegetableCategory } from './entities/vegetableCategory.entity';
import { vegetableMineral } from './entities/vegetableMineral.entity';
import { vegetableVitamin } from './entities/vegetableVitamin.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';

@Injectable()
export class VegetablesService {

  constructor(
    @InjectRepository(Vegetable) private readonly repo: Repository<Vegetable>,
    @InjectRepository(vegetableVitamin) private readonly vegetableVitamin: Repository<vegetableVitamin>,
    @InjectRepository(vegetableMineral) private readonly vegetableMineral: Repository<vegetableMineral>,
    @InjectRepository(vegetableCategory) private readonly vegetableCategory: Repository<vegetableCategory>,
    // @InjectRepository(fruitImage) private readonly image: Repository<fruitImage>,
    @InjectRepository(Vitamin) private readonly vitamin: Repository<Vitamin>,
    @InjectRepository(Mineral) private readonly mineral: Repository<Mineral>,
    @InjectRepository(Category) private readonly category: Repository<Category>) {

  }

  async create(createVegetableDto: CreateVegetableDto) {

    const vegetable = new Vegetable()

    let findVitamin = await this.vitamin.findOneOrFail(parseInt(createVegetableDto.vitaminsId));

    console.log("finding mineral")

    let findMineral = await this.mineral.findOneOrFail(parseInt(createVegetableDto.mineralsId));

    if (findVitamin && findMineral) {

      try {
        Object.assign(vegetable, createVegetableDto)

        this.repo.create(vegetable);

        let savedFruitData = await this.repo.save(vegetable);
        console.log("Saved fruit data")
        console.log(savedFruitData)
        let vitaminData = await this.saveVitaminData(savedFruitData.id, parseInt(createVegetableDto.vitaminsId))
        let mineralData = await this.saveMineralData(savedFruitData.id, parseInt(createVegetableDto.mineralsId))
        console.log(vitaminData, mineralData)
        return savedFruitData;
      } catch (ex) {
        console.log("Some error occurred during saving Fruit data")
        console.log(ex)
      }

    }

    return 'This action adds a new vegetable';
  }



  async saveVitaminData(fruitId, vitaminId) {
    const vegVitamin = new vegetableVitamin;
    console.log(fruitId, vitaminId)
    let vitaminData = {
      fruitId: fruitId,
      vitaminsId: vitaminId
      // image: createFruitDto.images
    }
    try {
      Object.assign(vegetableVitamin, vitaminData)

      this.vegetableVitamin.create(vegVitamin)
      this.vegetableVitamin.insert(vegVitamin);
      return "vitamin data saved"

    } catch (ex) {
      return ex
    }

  }
  async saveMineralData(fruitId, mineralId) {
    const vegMineral = new vegetableMineral();
    let mineralData = {
      fruitId: fruitId,
      mineralsId: mineralId
      // image: createFruitDto.images
    }
    try {
      Object.assign(vegetableMineral, mineralData)

      this.vegetableMineral.create(vegMineral)
      let data = this.vegetableMineral.insert(vegMineral);
      console.log("MIneral data" + data)

    } catch (ex) {
      console.log(ex)
    }

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
