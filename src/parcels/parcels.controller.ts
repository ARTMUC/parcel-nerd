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
import { ParcelId } from './interfaces/parcelId.type';
import { CoordService } from './coord.service';

@Controller('parcels')
export class ParcelsController {
  constructor(
    private readonly parcelsService: ParcelsService,
    private readonly coordService: CoordService,
  ) {}

  @Post('getByCoordinates')
  getParcelsIds(@Body() coordinatesArr: LineCoordinates[]) {
    return this.parcelsService.getParcelsIds(coordinatesArr);
  }

  @Post('getBoudsById')
  getParcelBounds(@Body() parcelIdArr: ParcelId[]) {
    return this.parcelsService.getParcelsBouds(parcelIdArr);
  }
  @Post('coordsToDeg')
  converCoordsToDeg(@Body() coordinatesArr: LineCoordinates[]) {
    return this.coordService.convertToDeg(coordinatesArr, 'forward');
  }
  @Post('getByLatLng')
  async getParcelIdsByLatLng(@Body() coordinatesArr: LineCoordinates[]) {
    return this.parcelsService.getParcelsIdsByLatLng(coordinatesArr);
  }

  // @Post()
  // create(@Body() createParcelDto: CreateParcelDto) {
  //   return this.parcelsService.create(createParcelDto);
  // }

  // @Get()
  // findAll() {
  //   return this.parcelsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.parcelsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateParcelDto: UpdateParcelDto) {
  //   return this.parcelsService.update(+id, updateParcelDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.parcelsService.remove(+id);
  // }
}
