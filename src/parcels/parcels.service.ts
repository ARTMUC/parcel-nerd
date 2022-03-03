import { HttpException, Injectable } from '@nestjs/common';
import * as Bluebird from 'bluebird';
import { LineCoordinates } from './interfaces/line-coordinates.type';
import { ParcelInfo } from './interfaces/parcel-info.interface';
import { ParcelId } from './interfaces/parcelId.type';
import { CoordService } from './coord.service';
import { ParcelBounds } from './interfaces/parcel-boundaries.type';
import fetch from 'node-fetch';

@Injectable()
export class ParcelsService {
  constructor(private coordService: CoordService) {}

  async getParcelByXY(x: number, y: number): Promise<ParcelInfo> {
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

  // async getParcelsIds(
  //   coordinatesArr: LineCoordinates[],
  // ): Promise<ParcelInfo[]> {
  //   const results: ParcelInfo[] = await Bluebird.map(
  //     this.coordService.splitLines(coordinatesArr),
  //     this.coordService.getParcelInfoForEl,
  //     {
  //       concurrency: 20,
  //     },
  //   );
  //   return this.coordService.removeDuplicates(results);
  // }

  // async getParcelsIdsByLatLng(
  //   coordinatesArr: LineCoordinates[],
  // ): Promise<ParcelInfo[]> {
  //   const convertedData = this.coordService.convertToDeg(
  //     coordinatesArr,
  //     'invert',
  //   );
  //   const results = await Bluebird.map(
  //     convertedData,
  //     this.coordService.getParcelInfoForEl,
  //     {
  //       concurrency: 20,
  //     },
  //   );
  //   return this.coordService.removeDuplicates(results);
  // }

  // async getParcelsBouds(parcelIdArr: ParcelId[]): Promise<ParcelBounds[]> {
  //   const coordinates: ParcelBounds[] = await Bluebird.map(
  //     parcelIdArr,
  //     this.coordService.getParcelCoordinates,
  //     {
  //       concurrency: 10,
  //     },
  //   );
  //   return coordinates.map((parcelCoords) =>
  //     this.coordService.convertToDeg(parcelCoords, 'forward'),
  //   );
  // }
  // print() {
  //   console.log('xxxxxxxxxxxxxxx');
  // }
  // create(createParcelDto: CreateParcelDto) {
  //   return 'This action adds a new parcel';
  // }

  // findAll() {
  //   return `This action returns all parcels`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} parcel`;
  // }

  // update(id: number, updateParcelDto: UpdateParcelDto) {
  //   return `This action updates a #${id} parcel`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} parcel`;
  // }
}
