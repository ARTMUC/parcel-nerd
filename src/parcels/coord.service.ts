import { Injectable } from '@nestjs/common';
import * as parse from 'xml-parser';
import fetch from 'node-fetch';
import { Readable } from 'stream';
import { FormDataEncoder } from 'form-data-encoder';
import { FormData } from 'formdata-node';
import * as proj4 from 'proj4';
import { LineCoordinates } from './interfaces/line-coordinates.type';
import { ParcelInfo } from './interfaces/parcel-info.interface';
import { ParcelId } from './interfaces/parcelId.type';
import { ParcelBounds } from './interfaces/parcel-boundaries.type';

@Injectable()
export class CoordService {
  removeDuplicates(results: ParcelInfo[]) {
    const uniqueResults = results.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t['Identyfikator działki'] === value['Identyfikator działki'],
        ),
    );
    return uniqueResults.map((el, i) => {
      return {
        ...el,
        index: i,
      };
    });
  }

  splitLines(coordinatesArr: LineCoordinates[]): LineCoordinates[] {
    const getLineLength = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };
    const newCoordinatesArr = [];
    coordinatesArr.forEach((coordinates, index) => {
      if (index === 0) return;
      const x1 = coordinatesArr[index - 1][0];
      const y1 = coordinatesArr[index - 1][1];
      const x2 = coordinates[0];
      const y2 = coordinates[1];
      const lineLength = getLineLength(x1, y1, x2, y2);
      const lineDivider = 3;
      for (let index = 0; index < lineLength / lineDivider; index++) {
        const newX = x1 + (index / (lineLength / lineDivider)) * (x2 - x1);
        const newY = y1 + (index / (lineLength / lineDivider)) * (y2 - y1);
        newCoordinatesArr.push([newX, newY]);
      }
    });
    return newCoordinatesArr;
  }

  async getParcelInfoForEl(element: LineCoordinates): Promise<ParcelInfo> {
    const [x, y] = element;
    const urlFirstPart = process.env.URL_FIRST_PART;
    const urlSecondPart = process.env.URL_SECOND_PART;
    const resp = await fetch(
      `${urlFirstPart}${x},${y},${x},${y}${urlSecondPart}`,
    );

    const data = await resp.text();
    const parsed = await parse(data);
    const parsedData = parsed.root.children[0].children[0].children;
    return Object.fromEntries(
      parsedData.map((el) => [el.attributes.Name, el.content]),
    ) as ParcelInfo;
  }

  convertToDeg(
    data: ParcelBounds | LineCoordinates[],
    direction: 'forward' | 'invert',
  ): ParcelBounds {
    proj4.defs([
      [
        'EPSG:2180',
        '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
      ],
      ['EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs'],
    ]);
    return data.map((coordinates) => {
      switch (direction) {
        case 'forward': {
          const flippedCoords = [coordinates[1], coordinates[0]];
          const convertedCoords = proj4('EPSG:2180', 'EPSG:4326').forward(
            flippedCoords,
          );
          return [convertedCoords[1], convertedCoords[0]];
        }
        case 'invert': {
          const flippedCoords = [coordinates[1], coordinates[0]];
          return proj4('EPSG:2180', 'EPSG:4326').invert(flippedCoords);
        }
      }
    });
  }

  async getParcelCoordinates(parcelId: ParcelId): Promise<ParcelBounds> {
    const url = process.env.URL_BOUNDS;

    const form = new FormData();
    form.append('REQUEST', 'GetById');
    form.append('IDDZ', parcelId);
    const encoder = new FormDataEncoder(form);
    const options = {
      method: 'post',
      headers: encoder.headers,
      body: Readable.from(encoder),
    };
    const resp = await fetch(url, options);
    const data = (await resp.json()).features[0].geometry.coordinates[0];

    return data.map((coords) => [coords[1], coords[0]]);
  }
}
