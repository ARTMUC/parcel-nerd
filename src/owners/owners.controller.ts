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
  @Post(':projectId')
  create(
    @Param('projectId') projectId: string,
    @Body() createOwnerDto: CreateOwnerDto,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    return this.ownersService.create(createOwnerDto, user, projectId);
  }

  @ApiOkResponse()
  @Get()
  findAll(@Req() request: RequestWithUser) {
    const { user } = request;
    return this.ownersService.findAll(user);
  }

  @ApiOkResponse()
  @Get('parcel=:parcelNumber&project=:projectId')
  findManyByParcelNumber(
    @Param('projectId') projectId: string,
    @Param('parcelNumber') parcelNumber: string,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    return this.ownersService.findManyByParcelNumber(
      parcelNumber,
      user,
      projectId,
    );
  }

  @ApiOkResponse()
  @Get('ownerId=:ownerId&project=:projectId')
  findOne(
    @Param('projectId') projectId: string,
    @Param('ownerId') ownerId: string,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    return this.ownersService.findOne(ownerId, user, projectId);
  }

  @ApiOkResponse()
  @Patch('ownerId=:ownerId&project=:projectId')
  update(
    @Param('projectId') projectId: string,
    @Param('ownerId') ownerId: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    return this.ownersService.update(ownerId, updateOwnerDto, user, projectId);
  }

  @ApiOkResponse()
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    const { user } = request;
    return this.ownersService.remove(id, user);
  }
}
