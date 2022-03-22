import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { ParcelsService } from 'src/parcels/parcels.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnersService {
  constructor(
    private readonly repo: PrismaService,
    private readonly parcelsService: ParcelsService,
  ) {}

  create(createOwnerDto: CreateOwnerDto, user: User, parcelId: string) {
    return this.repo.$transaction(async (repo) => {
      //*********** I NEED TO CHANGE THIS -> ADDING OWNERS SHOULD BE INDEPENDENT. WE SHOULD BE ABLE TO PASS AS MANY PARCEL NUMBERS AS POSSIBLE. ADDING OWNERS SHOULD BE CORRELATED WITH PARCEL NUMBERS AND NOT PARCEL IDs. IF THE PARCEL DOES NOT EXIST THEN PARCEL WOULD BE ADDED BY PARCEL NUMBER AND FETCHED FROM THE GEO API *****************************************

      const parcel = await this.parcelsService.findOne(parcelId, user);

      if (!parcel) {
        throw new NotFoundException('Parcel not found');
      }

      return repo.owner.create({
        data: {
          ...createOwnerDto,
          parcels: {
            connect: { id: parcelId },
          },
          user: {
            connect: { id: user.id },
          },
        },
      });
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

  async findManyByParcelNumber(parcelNumber: string, user: User) {
    console.log(parcelNumber);
    // const owners = await this.repo.$queryRawUnsafe(
    //   `SELECT DISTINCT Owner.id as ownerId FROM Owner LEFT JOIN _OwnerToParcel ON Owner.id = _OwnerToParcel.A LEFT JOIN Parcel ON _OwnerToParcel.B = Parcel.id WHERE Parcel.parcelNumber = ?`,
    //   parcelNumber,
    // );
    // const parcels = await this.repo.$queryRawUnsafe(
    //   `SELECT DISTINCT  Parcel.id as parcelId, Parcel.parcelNumber FROM Owner LEFT JOIN _OwnerToParcel ON Owner.id = _OwnerToParcel.A LEFT JOIN Parcel ON _OwnerToParcel.B = Parcel.id WHERE Parcel.parcelNumber = ?`,
    //   parcelNumber,
    // );

    const owners = await this.repo.parcel.findMany({
      where: {
        userId: user.id,
        parcelNumber,
      },

      // distinct: ['id'],
      select: {
        parcelNumber: true,
        id: true,
        owners: {
          select: { id: true, name: true },
          // distinct: ['id'],
        },
      },
    });

    return owners;

    // return { owners, parcels };
  }

  findOne(id: number) {
    return `This action returns a #${id} owner`;
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
