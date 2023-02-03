import { Vegetable } from 'src/controllers/vegetables/entities/vegetable.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { vegetableCategory } from './entities/vegetableCategory.entity';
import { vegetableMineral } from './entities/vegetableMineral.entity';
import { vegetableVitamin } from './entities/vegetableVitamin.entity';
import { Mineral } from '../minerals/entities/mineral.entity';
import { Vitamin } from '../vitamins/entities/vitamin.entity';
import { CreateVegetableDto } from './dto/create-vegetable.dto';
import { UpdateVegetableDto } from './dto/update-vegetable.dto';
import { vegetableImage } from './entities/vegetableImages.entity';

@Injectable()
export class VegetablesService {

  constructor(
    @InjectRepository(Vegetable) private readonly repo: Repository<Vegetable>,
    @InjectRepository(vegetableImage) private readonly vegetabeleImages: Repository<vegetableImage>,
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
    const vegetableImages = new vegetableImage()
    try {
      Object.assign(vegetable, createVegetableDto)

      this.repo.create(vegetable);
      let savedFruitData = await this.repo.save(vegetable);

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

  async findAll() {
    const myQuery = await this.repo
      .createQueryBuilder('vegetable')
      .select('id', 'name').where("approved = 0").getRawMany()
    // .leftJoinAndSelect('vegetableImage','vi')

    const myQuery1 = await this.repo.find()

    return myQuery1;
  }

  async findOne(id: number) {
    try {

      const myQuery = await this.vegetabeleImages.createQueryBuilder("vi")
        .select('vi.imageName')
        .where(`vi.vegetableId=${id}`)
        .getRawMany();

      const query = await this.repo.createQueryBuilder('vg')
        .select('vg.name')
        .where(`vg.id = ${id}`)
        .andWhere('vg.approved = 1').getRawMany();

      if (query.length !== 0) {
        return [query, myQuery];

      } else {
        throw new NotFoundException('Vegetable not found')
      }
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
}
