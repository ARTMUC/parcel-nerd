import { Injectable } from '@nestjs/common';
import * as parse from 'xml-parser';
import { map, Observable } from 'rxjs';
import fetch from 'node-fetch';
import { receiveMessageOnPort } from 'worker_threads';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';

@Injectable()
export class ParcelsService {
  constructor() {}

  async getParcelsIds(x: string, y: string): Promise<any> {
    const coordinates = [];
    for (let i = 0; i < 500; i++) {
      coordinates.push({ x, y });
    }

    const requests = coordinates.map(async (el, i) => {
      const { x, y } = el;
      const resp = await fetch(
        `https://polska.geoportal2.pl/map/wmsgfi/gfiproxy.php?VERSION=1.3.0&SERVICE=WMS&REQUEST=GetFeatureInfo&LAYERS=dzialki,geoportal&STYLES=,&FORMAT=image/png&BBOX=${x},${y},${x},${y}&WIDTH=612&HEIGHT=614&CRS=EPSG:2180&FEATURE_COUNT=50&QUERY_LAYERS=dzialki,geoportal&INFO_FORMAT==190&J=188`,
      );
      const text = await resp.text();
      const parsed = parse(text);
      const data = parsed.root.children[0].children[0].children;

      const parcelInfo = Object.fromEntries(
        data.map((el) => [el.attributes.Name, el.content]),
      );

      return parcelInfo;
    });
    const results = await Promise.all(requests);

    return await results;
  }

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
