import { Test, TestingModule } from '@nestjs/testing';
import { CoordinatesConverterService } from './coordinates-converter.service';

describe('CoordinatesConverterService', () => {
  let service: CoordinatesConverterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoordinatesConverterService],
    }).compile();

    service = module.get<CoordinatesConverterService>(CoordinatesConverterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
