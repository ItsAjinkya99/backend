import { Module } from '@nestjs/common';
import { VitaminsService } from './vitamins.service';
import { VitaminsController } from './vitamins.controller';

@Module({
  controllers: [VitaminsController],
  providers: [VitaminsService]
})
export class VitaminsModule {}
