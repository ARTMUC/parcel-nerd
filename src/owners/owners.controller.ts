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
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-auth.guard';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';
import { ApiOkResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthenticationGuard)
@Controller('owners')
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @ApiOkResponse()
  @Post(':parcelId')
  create(
    @Param('parcelId') parcelId: string,
    @Body() createOwnerDto: CreateOwnerDto,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    return this.ownersService.create(createOwnerDto, user, parcelId);
  }

  @ApiOkResponse()
  @Get()
  findAll(@Req() request: RequestWithUser) {
    const { user } = request;
    return this.ownersService.findAll(user);
  }

  @ApiOkResponse()
  @Get('parcel=:parcelNumber')
  findManyByParcelNumber(
    @Param('parcelNumber') parcelNumber: string,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    return this.ownersService.findManyByParcelNumber(parcelNumber, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: RequestWithUser) {
    return this.ownersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
    @Req() request: RequestWithUser,
  ) {
    return this.ownersService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    return this.ownersService.remove(+id);
  }
}
