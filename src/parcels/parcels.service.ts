// **************** TEST WHAT HAPPENS WITH OWNERS ON DELETE, UPDATE, CREATE ****************************
// IF WE ALREADY HAVE OWNERS FOR THIS PARCEL IN DB I WOULD LIKE TO JUST UPDATE THEM <- ITS NOT POSSIBLE TO HAVE OWNERS WITHOUT PARCELS. AFTER ADDING OWNER THAT HAS PARCEL NOT EXISTING IN THE DB, OWNERS SERVICE WILL CALL PARCELS SERVICE TO ADD PARCEL BY PARCEL NUMBER

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
    // TODO: CHACK FIRST IF THIS PARCEL ALREADY EXISTS NOT TO CREATE DUBLES

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

  //************************THIS METHOD IS NOT USED ANYWHERE********************************/
  /*****************************************************************************************/
  async createByParcelNumber(
    projectId: string,
    user: User,
    parcelNo: string,
  ): Promise<Parcel> {
    // TODO: CHACK FIRST IF THIS PARCEL ALREADY EXISTS NOT TO CREATE DUBLES

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
  //*********************************************************************************************** */

  async findAll(user: User) {
    const parcels = await this.repo.parcel.findMany({
      where: {
        userId: user.id,
      },
      include: {
        parcelBounds: true,
        owners: { select: { name: true, surname: true, id: true } },
      },
    });
    if (parcels.length < 1) {
      throw new NotFoundException('Parcel not found');
    } // do we really need this error ???
    return parcels;
  }

  async findManyByParcelNumber(
    user: User,
    parcels: string[],
    projectId: string,
  ) {
    //*********************************************************** */
    // TODO: IT WOULD BE GOOD TO ADD INFO ABOUT PARCEL NUMBERS THAT WE DID NOT FIND IN THE DB

    //****************************************************************** */
    // const existingParcelsNumbers = existingParcelsData.map(
    //   (parcel) => parcel.parcelNumber,
    // );

    // const newParcelsNumbers = createOwnerDto.parcels.filter(
    //   (el) => !existingParcelsNumbers.includes(el),
    // );

    // const newParcelsRequest = newParcelsNumbers.map(async (parcelNo) => {
    //   return await this.parcelDataGetterService.fetchParcelDataByParcelNumber(
    //     parcelNo,
    //   );
    // });
    // const newParcelsData = await Promise.all(newParcelsRequest);

    //************************************************************** */

    return await this.repo.parcel.findMany({
      // distinct: ['parcelNumber'],
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
