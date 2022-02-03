import { MainModule } from './../main/main.module';
import { forwardRef, Module } from '@nestjs/common';
import { FruitsService } from './fruits.service';
import { FruitsController } from './fruits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './entities/fruit.entity';

@Module({
  imports: [forwardRef(() => MainModule),
    TypeOrmModule.forFeature([Fruit])],
  controllers: [FruitsController],
  providers: [FruitsService]
})
export class FruitsModule {}
