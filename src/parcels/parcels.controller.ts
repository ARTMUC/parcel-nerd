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

@Controller('parcels')
export class ParcelsController {
  constructor(private readonly parcelsService: ParcelsService) {}

  @Get(':x,:y,:x2,:y2')
  getParcelsIds(
    @Param('x') x: string,
    @Param('y') y: string,
    @Param('x2') x2: string,
    @Param('y2') y2: string,
  ) {
    return this.parcelsService.getParcelsIds(x, y, x2, y2);
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
