import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';
import { Coordinates } from './interfaces/coordinates.interface';
import { ParcelId } from './interfaces/parcelId.interface';

@Controller('parcels')
export class ParcelsController {
  constructor(private readonly parcelsService: ParcelsService) {}

  @Post('getByCoordinates')
  getParcelsIds(@Body() coordinatesArr: Coordinates[]) {
    return this.parcelsService.getParcelsIds(coordinatesArr);
  }

  @Post('getBoudsById')
  getParcelBounds(@Body() parcelIdArr: ParcelId[]) {
    return this.parcelsService.getParcelsBouds(parcelIdArr);
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
