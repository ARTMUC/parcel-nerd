import { HttpException, Injectable } from '@nestjs/common';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';
import fetch from 'node-fetch';
import { CreateParcelBoundsDto } from './dto/create-parcelBounds.dto';
import { CreateParcelByXYDto } from './dto/create-parcelByXY.dto.';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ParcelsService {
  constructor(private readonly repo: PrismaService) {}

  async getParcelByXY(
    createParcelByXYDto: CreateParcelByXYDto,
    projectId: string,
  ): Promise<any> {
    const { x, y } = createParcelByXYDto;

    const res = await fetch(
      `https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${y},${x},4326&result=id,voivodeship,county,commune,geom_wkt&srid=4326`,
    );

    const data = await res.text();
    if (data.substr(0, 1) !== '0')
      throw new HttpException('Please check input request', 400);
    const [parcelNumber, voivodeship, county, commune, geom] = data
      .split('\n')[1]
      .split('|');

    if (!parcelNumber || !voivodeship || !county || !commune || !geom)
      throw new HttpException('Please check input request', 400);

    const r = /(([\d.]+)\s+([\d.]+))/g;
    // const parcelBounds = [...geom.matchAll(r)].map((d) => [+d[3], +d[2]]) as [
    //   number,
    //   number,
    // ][];
    const parcelBounds = [...geom.matchAll(r)].map((d) => {
      const x = +d[3];
      const y = +d[2];
      return { x, y };
    }) as any;

    const createParcelDto: CreateParcelDto = {
      parcelNumber,
      voivodeship,
      county,
      commune,
      parcelBounds,
    };

    return this.create(createParcelDto, projectId);
  }

  create(createParcelDto: CreateParcelDto, projectId: string) {
    const { parcelNumber, voivodeship, county, commune, parcelBounds } =
      createParcelDto;
    return this.repo.parcel.create({
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

  remove(id: number) {
    return `This action removes a #${id} parcel`;
  }
}
