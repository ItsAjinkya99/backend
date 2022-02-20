import { Test, TestingModule } from '@nestjs/testing';
import { MineralsService } from './minerals.service';

describe('MineralsService', () => {
  let service: MineralsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MineralsService],
    }).compile();

    service = module.get<MineralsService>(MineralsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
