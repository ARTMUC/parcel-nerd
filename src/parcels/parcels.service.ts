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

  async createByXY(
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
          user: {
            connect: { id: user.id },
          },
          parcelBounds: {
            create: parcelBounds,
          },
        },
        include: { parcelBounds: { select: { x: true, y: true } } },
      });
    });
  }

  async createByParcelNumber(
    projectId: string,
    user: User,
    parcelNo: string,
  ): Promise<Parcel> {
    const { parcelNumber, voivodeship, county, commune, parcelBounds } =
      await this.parcelDataGetterService.fetchParcelDataByParcelNumber(
        parcelNo,
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
          user: {
            connect: { id: user.id },
          },
          parcelBounds: {
            create: parcelBounds,
          },
        },
        include: { parcelBounds: { select: { x: true, y: true } } },
      });
    });
  }

  async findAll(user: User, projectId: string) {
    const parcels = await this.repo.parcel.findMany({
      where: {
        userId: user.id,
        projectId,
      },
      include: {
        parcelBounds: true,
        owners: { select: { name: true, surname: true, id: true } },
      },
    });
    if (parcels.length < 1) {
      throw new NotFoundException('Parcel not found');
    }
    return parcels;
  }

  async findManyByParcelNumber(
    user: User,
    parcels: string[],
    projectId: string,
  ) {
    return await this.repo.parcel.findMany({
      where: {
        userId: user.id,
        parcelNumber: { in: parcels },
        projectId,
      },
    });
  }

  async findOne(id: string, user: User) {
    const [parcel] = await this.repo.parcel.findMany({
      where: {
        id,
        userId: user.id,
      },
      include: {
        parcelBounds: true,
        owners: true,
      },
    });
    if (!parcel) {
      throw new NotFoundException('Parcel not found');
    }
    return parcel;
  }

  async update(parcelId: string, updateParcelDto: UpdateParcelDto, user: User) {
    const result = await this.repo.parcel.updateMany({
      where: {
        id: parcelId,
        userId: user.id,
      },
      data: {
        ...updateParcelDto,
      },
    });

    if (result.count === 0) {
      throw new NotFoundException('Parcel not found');
    }

    return result;
  }

  async remove(parcelId: string, user: User) {
    return await this.repo.$transaction(async (repo) => {
      const deleteBounds = repo.parcelBounds.deleteMany({
        where: {
          parcelId,
        },
      });

      const deleteParcel = repo.parcel.deleteMany({
        where: {
          id: parcelId,
          userId: user.id,
        },
      });

      const result = await Promise.all([deleteBounds, deleteParcel]);

      if (result[0].count === 0 || result[1].count === 0) {
        throw new NotFoundException('Parcel not found');
      }

      return result;
    });
  }
}
