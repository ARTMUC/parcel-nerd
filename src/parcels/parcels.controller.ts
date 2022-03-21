import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { UpdateParcelDto } from './dto/update-parcel.dto';
import { CreateParcelByXYDto } from './dto/create-parcelByXY.dto.';
import { ApiOkResponse } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-auth.guard';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';

@UseGuards(JwtAuthenticationGuard)
@Controller('parcels')
export class ParcelsController {
  constructor(private readonly parcelsService: ParcelsService) {}

  @ApiOkResponse()
  @Post('getParcelByXY/:projectId')
  async getParcelByXY(
    @Param('projectId') projectId: string,
    @Body() createParcelByXYDto: CreateParcelByXYDto,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;

    return this.parcelsService.create(projectId, user, createParcelByXYDto);
  }

  @ApiOkResponse()
  @Get()
  findAll(@Req() request: RequestWithUser) {
    const { user } = request;

    return this.parcelsService.findAll(user);
  }

  @ApiOkResponse()
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: RequestWithUser) {
    const { user } = request;

    return this.parcelsService.findOne(id, user);
  }

  // ************* TO DO LATER *******************
  // - ADDING PARCEL BY ID

  // @Post()
  // create(@Body() createParcelDto: CreateParcelDto) {
  //   return this.parcelsService.create(createParcelDto);
  // }
  @ApiOkResponse()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParcelDto: UpdateParcelDto,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;

    return this.parcelsService.update(id, updateParcelDto, user);
  }

  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id') parcelId: string, @Req() request: RequestWithUser) {
    const { user } = request;

    return this.parcelsService.remove(parcelId, user);
  }
}
