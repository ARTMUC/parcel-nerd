import { Module } from '@nestjs/common';
import { LinesService } from './lines.service';
import { LinesController } from './lines.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { CoordinatesConverterModule } from 'src/coordinates-converter/coordinates-converter.module';

@Module({
  imports: [PrismaModule, ProjectsModule, CoordinatesConverterModule],
  controllers: [LinesController],
  providers: [LinesService]
})
export class LinesModule {}
