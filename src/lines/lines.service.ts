import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';

@Injectable()
export class LinesService {
  constructor(
    private readonly repo: PrismaService,
    private readonly projectsService: ProjectsService,
  ) {}

  create(createLineDto: CreateLineDto, user: User, projectId: string) {
    const { title, lineCoords } = createLineDto;

    return this.repo.$transaction(async (repo) => {
      const project = await this.projectsService.findOne(projectId, user);

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      return repo.line.create({
        data: {
          title,
          lineCoords: {
            create: [...lineCoords],
          },
          project: {
            connect: { id: projectId },
          },
        },
        include: { lineCoords: true },
      });
    });
  }

  async findAll(user: User, projectId: string) {
    const owners = await this.repo.line.findMany({
      where: {
        project: {
          userId: user.id,
          id: projectId,
        },
      },
      include: { lineCoords: true },
    });
    if (owners.length < 1) {
      throw new NotFoundException('Owners not found');
    }
    return owners;
  }

  async findOne(lineId: string, user: User) {
    const line = await this.repo.line.findMany({
      where: {
        id: lineId,
        project: {
          userId: user.id,
        },
      },
      select: { id: true, title: true, lineCoords: true },
    });

    if (!line) {
      throw new NotFoundException('Line not found');
    }
    return line;
  }

  async update(lineId: string, user: User, updateLineDto: UpdateLineDto) {
    const { title, lineCoords } = updateLineDto;

    return this.repo.$transaction(async (repo) => {
      const deleteLineCoords = repo.lineCoords.deleteMany({
        where: {
          lineId,
          line: {
            project: { userId: user.id },
          },
        },
      });

      const updateLine = repo.line.update({
        where: {
          id: lineId,
        },
        data: {
          title,
          lineCoords: {
            create: [...lineCoords],
          },
        },
        include: { lineCoords: true },
      });

      return await Promise.all([deleteLineCoords, updateLine]);
    });
  }

  async remove(lineId: string, user: User) {
    return await this.repo.$transaction(async (repo) => {
      const deleteLineCoords = repo.lineCoords.deleteMany({
        where: {
          lineId,
          line: {
            project: { userId: user.id },
          },
        },
      });

      const deleteLine = repo.line.deleteMany({
        where: {
          id: lineId,
          project: {
            userId: user.id,
          },
        },
      });

      const result = await Promise.all([deleteLine, deleteLineCoords]);

      if (result[0].count === 0 || result[1].count === 0) {
        throw new NotFoundException('Line not found');
      }

      return result;
    });
  }
}