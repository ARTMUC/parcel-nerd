import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { LinesService } from './lines.service';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('lines')
export class LinesController {
  constructor(private readonly linesService: LinesService) {}

  @ApiOkResponse()
  @Post(':projectId')
  create(
    @Body() createLineDto: CreateLineDto,
    @Param('projectId') projectId: string,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    return this.linesService.create(createLineDto, user, projectId);
  }

  @Get()
  findAll(@Req() request: RequestWithUser) {
    const { user } = request;
    return this.linesService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: RequestWithUser) {
    const { user } = request;
    return this.linesService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLineDto: UpdateLineDto,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    return this.linesService.update(id, user, updateLineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    const { user } = request;
    return this.linesService.remove(id, user);
  }
}
