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
    return 'This action adds a new owner';
  }

  async findAll(user: User) {
    const owners = await this.repo.owner.findMany({
      where: {
        userId: user.id,
      },
      include: { parcels: { select: { parcelNumber: true, id: true } } },
    });
    if (owners.length < 1) {
      throw new NotFoundException('Parcel not found');
    }
    return owners;
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
