import { Module } from '@nestjs/common';
import { LinesService } from './lines.service';
import { LinesController } from './lines.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [PrismaModule, ProjectsModule],
  controllers: [LinesController],
  providers: [LinesService],
})
export class LinesModule {}
