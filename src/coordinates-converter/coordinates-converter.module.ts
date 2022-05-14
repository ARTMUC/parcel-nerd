import { Module } from '@nestjs/common';
import { CoordinatesConverterService } from './coordinates-converter.service';

@Module({
  providers: [CoordinatesConverterService],
  exports: [CoordinatesConverterService]
})
export class CoordinatesConverterModule {}
