import { Test, TestingModule } from '@nestjs/testing';
import { VitaminsService } from './vitamins.service';

describe('VitaminsService', () => {
  let service: VitaminsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VitaminsService],
    }).compile();

    service = module.get<VitaminsService>(VitaminsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
