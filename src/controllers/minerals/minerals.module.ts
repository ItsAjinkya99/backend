import { forwardRef, Module } from '@nestjs/common';
import { MineralsService } from './minerals.service';
import { MineralsController } from './minerals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Mineral } from './entities/mineral.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([Mineral])],
  controllers: [MineralsController],
  providers: [MineralsService]
})
export class MineralsModule { }
