import { Injectable } from '@nestjs/common';
import * as parse from 'xml-parser';
import fetch from 'node-fetch';
import * as Bluebird from 'bluebird';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';

@Injectable()
export class ParcelsService {
  async getParcelsIds(
    x: string,
    y: string,
    x2: string,
    y2: string,
  ): Promise<any> {
    const coordinates = [
      { x, y },
      { x: x2, y: y2 },
    ];
    // for (let i = 0; i < 1000; i++) {
    //   coordinates.push({ x, y });
    // } // mock

    return await Bluebird.map(coordinates, this.getParcelInfoForEl, {
      concurrency: 200,
    });
  }

  private async getParcelInfoForEl(element, i) {
    const { x, y } = element;
    const urlFirstPart =
      'https://polska.geoportal2.pl/map/wmsgfi/gfiproxy.php?VERSION=1.3.0&SERVICE=WMS&REQUEST=GetFeatureInfo&LAYERS=dzialki,geoportal&STYLES=,&FORMAT=image/png&BBOX=';
    const urlSecondPart =
      '&WIDTH=612&HEIGHT=614&CRS=EPSG:2180&FEATURE_COUNT=50&QUERY_LAYERS=dzialki,geoportal&INFO_FORMAT==190&J=188';
    const resp = await fetch(
      `${urlFirstPart}${x},${y},${x},${y}${urlSecondPart}`,
    );
    const parsedData = parse(await resp.text()).root.children[0].children[0]
      .children;

    const parcelInfo = Object.fromEntries(
      parsedData.map((el) => [el.attributes.Name, el.content]),
    );
    parcelInfo.coordinates = { x, y };
    parcelInfo.index = i + 1;
    return parcelInfo;
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
