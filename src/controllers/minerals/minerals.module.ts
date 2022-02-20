import { Module } from '@nestjs/common';
import { MineralsService } from './minerals.service';
import { MineralsController } from './minerals.controller';

@Module({
  controllers: [MineralsController],
  providers: [MineralsService]
})
export class MineralsModule {}
