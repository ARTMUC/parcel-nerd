import { Module } from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { ParcelsController } from './parcels.controller';

import { ConfigModule } from '@nestjs/config';
import { CoordService } from './coord.service';

@Module({
  imports: [],
  controllers: [ParcelsController],
  providers: [ParcelsService, CoordService],
})
export class ParcelsModule {}
