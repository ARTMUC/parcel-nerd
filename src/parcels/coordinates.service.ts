import { Injectable } from '@nestjs/common';
import * as parse from 'xml-parser';
import fetch from 'node-fetch';
import { Readable } from 'stream';
import { FormDataEncoder } from 'form-data-encoder';
import { FormData } from 'formdata-node';
import { Coordinates } from './interfaces/coordinates.interface';
import { ParcelInfo } from './interfaces/parcel-info.interface';
import { ParcelId } from './interfaces/parcelId.interface';

@Injectable()
export class CoordinatesService {
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

  splitLines(coordinatesArr: Coordinates[]): Coordinates[] {
    const getLineLength = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };
    const newCoordinatesArr = [];
    coordinatesArr.forEach((coordinates, index) => {
      if (index === 0) return;

      const x1 = coordinatesArr[index - 1].x;
      const y1 = coordinatesArr[index - 1].y;
      const x2 = coordinates.x;
      const y2 = coordinates.y;

      const lineLength = getLineLength(x1, y1, x2, y2);
      const lineDivider = 3;

      for (let index = 0; index < lineLength / lineDivider; index++) {
        const newX = x1 + (index / (lineLength / lineDivider)) * (x2 - x1);
        const newY = y1 + (index / (lineLength / lineDivider)) * (y2 - y1);
        newCoordinatesArr.push({ x: newX, y: newY });
      }
    });

    return newCoordinatesArr;
  }

  async getParcelInfoForEl(element) {
    const { x, y } = element;

    const urlFirstPart = process.env.URL_FIRST_PART;
    const urlSecondPart = process.env.URL_SECOND_PART;

    const resp = await fetch(
      `${urlFirstPart}${x},${y},${x},${y}${urlSecondPart}`,
    );
    const parsedData = parse(await resp.text()).root.children[0].children[0]
      .children;
    const parcelInfo = Object.fromEntries(
      parsedData.map((el) => [el.attributes.Name, el.content]),
    );
    parcelInfo.coordinates = { x, y };
    return parcelInfo;
  }
  async getParcelCoordinates(parcelId: ParcelId) {
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

    return data;
  }
}
