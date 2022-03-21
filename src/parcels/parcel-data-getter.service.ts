import { HttpException, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CreateParcelByXYDto } from './dto/create-parcelByXY.dto.';
import { FetchedParcelData } from './interfaces/fetched-parcel-data.interface';
import { FetchedParcelBounds } from './interfaces/fetched-parcel-bounds.interface';

@Injectable()
export class ParcelDataGetterService {
  async fetchParcelDataByXY(createParcelByXYDto: CreateParcelByXYDto) {
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
    }) as FetchedParcelBounds;

    return {
      parcelNumber,
      voivodeship,
      county,
      commune,
      parcelBounds,
    } as FetchedParcelData;
  }
}
