import { Module } from '@nestjs/common';
import { VitaminsService } from './vitamins.service';
import { VitaminsController } from './vitamins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vitamin } from './entities/vitamin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vitamin])],
  controllers: [VitaminsController],
  providers: [VitaminsService]
})
export class VitaminsModule { }
