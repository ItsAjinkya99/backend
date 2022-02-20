import { Test, TestingModule } from '@nestjs/testing';
import { MineralsController } from './minerals.controller';
import { MineralsService } from './minerals.service';

describe('MineralsController', () => {
  let controller: MineralsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MineralsController],
      providers: [MineralsService],
    }).compile();

    controller = module.get<MineralsController>(MineralsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
