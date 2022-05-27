import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { LinesService } from './lines.service';
import { CreateLineDto } from './dto/create-line.dto';
import { UpdateLineDto } from './dto/update-line.dto';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-auth.guard';
import { ResponceLineDto } from './dto/responce-line.dto';
import { RemoveLineResponseDto } from './dto/remove-line-response.dto';

@UseGuards(JwtAuthenticationGuard)
@Controller('lines')
export class LinesController {
  constructor(private readonly linesService: LinesService) {}

  @ApiCreatedResponse({ type: ResponceLineDto })
  @Post('project=:projectId')
  create(@Body() createLineDto: CreateLineDto, @Param('projectId') projectId: string, @Req() request: RequestWithUser) {
    const { user } = request;
    return this.linesService.create(createLineDto, user, projectId);
  }

  @ApiOkResponse({ type: [ResponceLineDto] })
  @Get('project=:projectId')
  findAll(@Req() request: RequestWithUser, @Param('projectId') projectId: string) {
    const { user } = request;
    return this.linesService.findAll(user, projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: RequestWithUser) {
    const { user } = request;
    return this.linesService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLineDto: UpdateLineDto, @Req() request: RequestWithUser) {
    const { user } = request;
    return this.linesService.update(id, user, updateLineDto);
  }

  @ApiOkResponse({ type: RemoveLineResponseDto })
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    const { user } = request;
    return this.linesService.remove(id, user);
  }
}
