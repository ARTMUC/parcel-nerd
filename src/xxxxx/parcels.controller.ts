import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import * as Bluebird from 'bluebird';
import { ParcelsService } from './parcels.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';
import { LineCoordinates } from './interfaces/line-coordinates.type';
import { CoordService } from './coord.service';

@Controller('xxx')
export class ParcelsController {
  constructor(
    private readonly parcelsService: ParcelsService,
    private readonly coordService: CoordService,
  ) {}

  @Post('getParcelByXY/:x,:y')
  getParcelByXY(@Param('x') x: string, @Param('y') y: string) {
    return this.parcelsService.getParcelByXY(+x, +y);
  }
  @Post('coordsToDeg')
  converCoordsToDeg(@Body() coordinatesArr: LineCoordinates[]) {
    return this.coordService.convertToDeg(coordinatesArr, 'forward');
  }
}
