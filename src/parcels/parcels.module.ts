import { Module } from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { ParcelsController } from './parcels.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { ParcelDataGetterService } from './parcel-data-getter.service';

@Module({
  imports: [PrismaModule, ProjectsModule],
  controllers: [ParcelsController],
  providers: [ParcelsService, ParcelDataGetterService],
  exports: [ParcelsService],
})
export class ParcelsModule {}
