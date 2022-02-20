import { Test, TestingModule } from '@nestjs/testing';
import { VitaminsController } from './vitamins.controller';
import { VitaminsService } from './vitamins.service';

describe('VitaminsController', () => {
  let controller: VitaminsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VitaminsController],
      providers: [VitaminsService],
    }).compile();

    controller = module.get<VitaminsController>(VitaminsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
