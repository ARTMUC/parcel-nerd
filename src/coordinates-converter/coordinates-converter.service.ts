import { Injectable } from '@nestjs/common';
import * as proj4 from 'proj4';
import { LineCoordinates } from './interfaces/line-coordinates.type';

@Injectable()
export class CoordinatesConverterService {
  coordSystemDefinitions = [
    [
      'EPSG:2180',
      '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
    ],
    ['EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs'],
    [
      'EPSG:2177',
      '+proj=tmerc +lat_0=0 +lon_0=18 +k=0.999923 +x_0=6500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
    ],
  ];

  convertToDeg(
    data: LineCoordinates[],
    originalSystem: string,
  ): LineCoordinates[] {
    proj4.defs(this.coordSystemDefinitions);
    return data.map((coordinates) => {
      const flippedCoords = [coordinates[1], coordinates[0]];
      console.log(flippedCoords);
      const convertedCoords = proj4(originalSystem, 'EPSG:4326').forward(
        coordinates,
      );
      return [convertedCoords[1], convertedCoords[0]];
    });
  }
}
