import { forwardRef, Module } from '@nestjs/common';
import { MineralsService } from './minerals.service';
import { MineralsController } from './minerals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MainModule } from '../main/main.module';
import { Mineral } from './entities/mineral.entity';

@Module({
  imports: [forwardRef(() => MainModule),
  TypeOrmModule.forFeature([Mineral])],
  controllers: [MineralsController],
  providers: [MineralsService]
})
export class MineralsModule { }
