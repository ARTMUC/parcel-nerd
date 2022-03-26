import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { FetchedParcelData } from 'src/parcels/interfaces/fetched-parcel-data.interface';
import { ParcelDataGetterService } from 'src/parcels/parcel-data-getter.service';
import { ParcelsService } from 'src/parcels/parcels.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnersService {
  constructor(
    private readonly repo: PrismaService,
    private readonly parcelsService: ParcelsService,
    private readonly parcelDataGetterService: ParcelDataGetterService,
  ) {}

  async create(createOwnerDto: CreateOwnerDto, user: User, projectId: string) {
    const parcelsIds = (
      await this.parcelsService.findManyByParcelNumber(
        user,
        createOwnerDto.parcels,
        projectId,
      )
    ).map((parcel) => {
      return { id: parcel.id };
    });

    // throw an Error if some parcels are not found

    return this.repo.owner.create({
      data: {
        ...{
          ...createOwnerDto,
          parcels: undefined,
        },
        user: {
          connect: { id: user.id },
        },
        parcels: {
          connect: parcelsIds,
        },
      },
    });
  }

  async findAll(user: User) {
    const owners = await this.repo.owner.findMany({
      where: {
        userId: user.id,
      },
      include: { parcels: { select: { parcelNumber: true, id: true } } },
    });
    if (owners.length < 1) {
      throw new NotFoundException('Owners not found');
    }
    return owners;
  }

  async findManyByParcelNumber(
    parcelNumber: string,
    user: User,
    projectId: string,
  ) {
    const owners = await this.repo.parcel.findMany({
      where: {
        userId: user.id,
        parcelNumber,
        projectId,
      },

      select: {
        parcelNumber: true,
        id: true,

        owners: {
          select: { id: true, name: true },
        },
      },
    });

    return owners;
  }

  async findOne(ownerId: string, user: User, projectId: string) {
    const owner = (
      await this.repo.owner.findMany({
        where: {
          userId: user.id,
          id: ownerId,
        },
        select: {
          id: true,
          name: true,
          surname: true,
          streetName: true,
          homeNumber: true,
          city: true,
          postalCode: true,
          parcels: {
            where: { projectId },
            select: { id: true, parcelNumber: true },
          },
        },
      })
    )[0];

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }
    return owner;
  }

  async update(
    ownerId: string,
    updateOwnerDto: UpdateOwnerDto,
    user: User,
    projectId: string,
  ) {
    const parcelsIds = (
      await this.parcelsService.findManyByParcelNumber(
        user,
        updateOwnerDto.parcels,
        projectId,
      )
    ).map((parcel) => {
      return { id: parcel.id };
    });

    // throw an Error if some parcels are not found

    const result = await this.repo.owner.update({
      where: {
        id: ownerId,
      },
      data: {
        ...{ ...updateOwnerDto, parcels: undefined },
        parcels: {
          connect: parcelsIds,
        },
      },
    });

    if (!result) {
      throw new NotFoundException('Parcel not found');
    }

    return result;
  }

  remove(ownerId: string, user: User) {
    return this.repo.owner.deleteMany({
      where: {
        id: ownerId,
        userId: user.id,
      },
    });
  }
}
