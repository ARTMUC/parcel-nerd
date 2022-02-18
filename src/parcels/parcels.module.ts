import { Module } from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { ParcelsController } from './parcels.controller';
import { CoordinatesService } from './coordinates.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [ParcelsController],
  providers: [ParcelsService, CoordinatesService],
})
export class ParcelsModule {}
