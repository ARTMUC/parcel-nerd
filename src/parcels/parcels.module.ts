import { Module } from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { ParcelsController } from './parcels.controller';

@Module({
  imports: [],
  controllers: [ParcelsController],
  providers: [ParcelsService],
})
export class ParcelsModule {}
