import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateParcelDto } from './dto/update-parcel.dto';
import { CreateParcelByXYDto } from './dto/create-parcelByXY.dto.';
import { PrismaService } from 'prisma/prisma.service';
import { User, Parcel } from '@prisma/client';
import { ProjectsService } from 'src/projects/projects.service';
import { ParcelDataGetterService } from './parcel-data-getter.service';

@Injectable()
export class ParcelsService {
  constructor(
    private readonly repo: PrismaService,
    private readonly projectsService: ProjectsService,
    private readonly parcelDataGetterService: ParcelDataGetterService,
  ) {}

  async create(
    projectId: string,
    user: User,
    createParcelByXYDto: CreateParcelByXYDto,
  ): Promise<Parcel> {
    const { parcelNumber, voivodeship, county, commune, parcelBounds } =
      await this.parcelDataGetterService.fetchParcelDataByXY(
        createParcelByXYDto,
      );

    return this.repo.$transaction(async (repo) => {
      const project = await this.projectsService.findOne(projectId, user);

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      return repo.parcel.create({
        data: {
          parcelNumber,
          voivodeship,
          county,
          commune,
          project: {
            connect: { id: projectId },
          },
          parcelBounds: {
            create: parcelBounds,
          },
        },
        include: { parcelBounds: { select: { x: true, y: true } } },
      });
    });
  }

  findAll() {
    return `This action returns all parcels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parcel`;
  }

  update(id: number, updateParcelDto: UpdateParcelDto) {
    return `This action updates a #${id} parcel`;
  }

  async remove(parcelId: string, user: User) {
    return await this.repo.$transaction(async (repo) => {
      const parcel = (
        await repo.user.findMany({
          where: {
            id: user.id,
          },
          select: {
            projects: {
              select: {
                parcels: {
                  select: { id: true },
                  where: {
                    id: parcelId,
                  },
                },
              },
            },
          },
        })
      )[0].projects[0].parcels[0];

      if (!parcel) {
        throw new NotFoundException('Project not found');
      }

      const deleteBounds = repo.parcel.update({
        where: {
          id: parcelId,
        },
        data: {
          parcelBounds: {
            deleteMany: {},
          },
        },
      });

      const deleteParcel = repo.parcel.delete({
        where: {
          id: parcelId,
        },
      });

      await Promise.all([deleteBounds, deleteParcel]);

      return 'success';
    });
  }
}
