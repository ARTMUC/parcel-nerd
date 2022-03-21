import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ParcelsModule } from 'src/parcels/parcels.module';

@Module({
  imports: [PrismaModule, ParcelsModule],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
