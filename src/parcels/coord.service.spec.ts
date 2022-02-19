import { Test, TestingModule } from '@nestjs/testing';
import { CoordService } from './coord.service';

describe('CoordService', () => {
  let service: CoordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoordService],
    }).compile();

    service = module.get<CoordService>(CoordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
