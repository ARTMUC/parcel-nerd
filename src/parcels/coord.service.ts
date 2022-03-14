import { Injectable } from '@nestjs/common';
import * as parse from 'xml-parser';
import fetch from 'node-fetch';
import { Readable } from 'stream';
import { FormDataEncoder } from 'form-data-encoder';
import { FormData } from 'formdata-node';
import * as proj4 from 'proj4';
import { LineCoordinates } from './interfaces/line-coordinates.type';
import { ParcelInfo } from './interfaces/parcel-info.interface';
import { ParcelBounds } from './interfaces/parcel-boundaries.type';

@Injectable()
export class CoordService {
  convertToDeg(
    data: LineCoordinates[],
    direction: 'forward' | 'invert',
  ): LineCoordinates[] {
    proj4.defs([
      [
        'EPSG:2180',
        '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
      ],
      ['EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs'],
      [
        'EPSG:2177',
        '+proj=tmerc +lat_0=0 +lon_0=18 +k=0.999923 +x_0=6500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
      ],
    ]);
    return data.map((coordinates) => {
      switch (direction) {
        case 'forward': {
          const flippedCoords = [coordinates[1], coordinates[0]];
          console.log(flippedCoords);
          const convertedCoords = proj4('EPSG:2177', 'EPSG:4326').forward(
            coordinates, // uwaga!!!!! dojsc do tego gdzie ma to byc obrocone w koncu!!!!!
          );
          return [convertedCoords[1], convertedCoords[0]];
        }
        case 'invert': {
          const flippedCoords = [coordinates[1], coordinates[0]];
          const convertedCoords = proj4('EPSG:4326', 'EPSG:2180').forward(
            flippedCoords,
          );
          return [convertedCoords[1], convertedCoords[0]];
        }
      }
    });
  }
}
