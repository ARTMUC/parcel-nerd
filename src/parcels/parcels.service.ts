import { Injectable } from '@nestjs/common';
import * as Bluebird from 'bluebird';
import { Coordinates } from './interfaces/coordinates.interface';
import { ParcelInfo } from './interfaces/parcel-info.interface';
import { ParcelId } from './interfaces/parcelId.interface';
import { CoordService } from './coord.service';

@Injectable()
export class ParcelsService {
  constructor(private coordService: CoordService) {}
  async getParcelsIds(coordinatesArr: Coordinates[]): Promise<ParcelInfo[]> {
    const results: ParcelInfo[] = await Bluebird.map(
      this.coordService.splitLines(coordinatesArr),
      this.coordService.getParcelInfoForEl,
      {
        concurrency: 50,
      },
    );
    return this.coordService.removeDuplicates(results);
  }

  async getParcelsBouds(parcelIdArr: ParcelId[]) {
    // this.print();
    return await Bluebird.map(
      parcelIdArr,
      this.coordService.getParcelCoordinates,
      {
        concurrency: 10,
      },
    );
  }
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
