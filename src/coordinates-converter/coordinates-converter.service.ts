import { Injectable } from '@nestjs/common';
import * as proj4 from 'proj4';
import { CreateLineCoordsDto } from 'src/lines/dto/create-lineCoords.dto';

@Injectable()
export class CoordinatesConverterService {
  coordSystemDefinitions = [
    [
      'EPSG:2180',
      '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    ],
    ['EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs'],
    [
      'EPSG:2177',
      '+proj=tmerc +lat_0=0 +lon_0=18 +k=0.999923 +x_0=6500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    ],
    [
      'EPSG:2179',
      '+proj=tmerc +lat_0=0 +lon_0=24 +k=0.999923 +x_0=8500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    ],
    [
      'EPSG:2176',
      '+proj=tmerc +lat_0=0 +lon_0=15 +k=0.999923 +x_0=5500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    ],
    [
      'EPSG:3120',
      '+proj=sterea +lat_0=50.625 +lon_0=21.08333333333333 +k=0.9998 +x_0=4637000 +y_0=5467000 +ellps=krass +towgs84=33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84 +units=m +no_defs'
    ],
    [
      'EPSG:2178',
      '+proj=tmerc +lat_0=0 +lon_0=21 +k=0.999923 +x_0=7500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    ],
    [
      'EPSG:2174',
      '+proj=sterea +lat_0=51.67083333333333 +lon_0=16.67222222222222 +k=0.9998 +x_0=3703000 +y_0=5627000 +ellps=krass +towgs84=33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84 +units=m +no_defs'
    ],
    [
      'EPSG:2173',
      '+proj=sterea +lat_0=53.58333333333334 +lon_0=17.00833333333333 +k=0.9998 +x_0=3501000 +y_0=5999000 +ellps=krass +towgs84=33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84 +units=m +no_defs'
    ],
    [
      'EPSG:2172',
      '+proj=sterea +lat_0=53.00194444444445 +lon_0=21.50277777777778 +k=0.9998 +x_0=4603000 +y_0=5806000 +ellps=krass +towgs84=33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84 +units=m +no_defs'
    ],
    [
      'EPSG:2175',
      '+proj=tmerc +lat_0=0 +lon_0=18.95833333333333 +k=0.999983 +x_0=237000 +y_0=-4700000 +ellps=krass +towgs84=33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84 +units=m +no_defs'
    ],
    [
      'EPSG:3328',
      '+proj=sterea +lat_0=52.16666666666666 +lon_0=19.16666666666667 +k=0.999714 +x_0=500000 +y_0=500000 +ellps=krass +towgs84=33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84 +units=m +no_defs'
    ]
  ];

  convertToDeg(data: CreateLineCoordsDto[], originalSystem: string): CreateLineCoordsDto[] {
    this.loadCoordinatesDefinitions();

    const convertedCoordinates = this.convertUnits(this.deepCopyData(data), originalSystem, 'EPSG:4326');
    return this.inverseCoordinates(convertedCoordinates);
  }

  //this library seems to be mutating data so please work only on deep copy of data you want to pass here
  private convertUnits(
    copiedData: CreateLineCoordsDto[],
    originalSystem: string,
    newSystem: string
  ): CreateLineCoordsDto[] {
    return copiedData.map((coordinates) => {
      return proj4(originalSystem, newSystem).forward(coordinates);
    });
  }

  private inverseCoordinates(coordinates: CreateLineCoordsDto[]): CreateLineCoordsDto[] {
    return coordinates.map((coord) => {
      return { x: coord.y, y: coord.x };
    });
  }

  private deepCopyData(data: CreateLineCoordsDto[]): CreateLineCoordsDto[] {
    return JSON.parse(JSON.stringify(data));
  }

  private loadCoordinatesDefinitions() {
    proj4.defs(this.coordSystemDefinitions);
  }
}
