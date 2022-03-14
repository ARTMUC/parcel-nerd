import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LineCoordinates } from './interfaces/line-coordinates.type';
import { ParcelInfo } from './interfaces/parcel-info.interface';
import { CoordService } from './coord.service';
import { ParcelBounds } from './interfaces/parcel-boundaries.type';
import fetch from 'node-fetch';

@Injectable()
export class ParcelsService {
  constructor(
    private coordService: CoordService,
    private readonly prismaService: PrismaService,
  ) {}

  async getParcelByXY(x: number, y: number): Promise<ParcelInfo> {
    await this.prismaService.user.create({
      data: {
        email: 'asdfsadf1111111111111111111111',
        test1234: 'asdfasdfasdf',
        name: 'adsfasdfasdf',
        password: 'safdsdfhsdfgh',
        isEmailConfirmed: true,
        emailConfirmationToken: 'asdgasdfasdfasdfasdf',
      },
    });
    const res = await fetch(
      `https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${y},${x},4326&result=id,voivodeship,county,commune,geom_wkt&srid=4326`,
    );

    const data = await res.text();
    if (data.substr(0, 1) !== '0')
      throw new HttpException('Please check input request', 400);
    const [id, voivodeship, county, commune, geom] = data
      .split('\n')[1]
      .split('|');

    if (!id || !voivodeship || !county || !commune || !geom)
      throw new HttpException('Please check input request', 400);

    const r = /(([\d.]+)\s+([\d.]+))/g;
    const boundCoords = [...geom.matchAll(r)].map((d) => [
      +d[3],
      +d[2],
    ]) as ParcelBounds;

    return {
      id,
      voivodeship,
      county,
      commune,
      boundCoords,
    };
  }
}
