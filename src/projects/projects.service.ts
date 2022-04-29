import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(@Inject('PRISMA_SERVICE') private repo: PrismaClient) {}

  create(createProjectDto: CreateProjectDto, user: User) {
    return this.repo.project.create({
      data: {
        ...createProjectDto,
        user: {
          connect: { id: user.id },
        },
      },
    });
  }

  findAll(user: User) {
    return this.repo.project.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        userId: true,
      },
      where: {
        userId: user.id,
      },
    });
  }

  async findOne(id: string, user: User) {
    const [project] = await this.repo.project.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        userId: true,
      },
      where: {
        id,
        userId: user.id,
      },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  update(id: string, updateProjectDto: UpdateProjectDto, user: User) {
    return this.repo.project.updateMany({
      data: updateProjectDto,
      where: {
        id,
        userId: user.id,
      },
    });
  }

  remove(id: string, user: User) {
    return this.repo.project.deleteMany({
      where: {
        id,
        userId: user.id,
      },
    });
  }
}
