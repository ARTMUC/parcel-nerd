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
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import JwtAuthenticationGuard from 'src/auth/guards/jwt-auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import RequestWithUser from 'src/auth/interfaces/request-with-user.interface';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOkResponse()
  @UseGuards(JwtAuthenticationGuard)
  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    return this.projectsService.create(createProjectDto, user);
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll(@Req() request: RequestWithUser) {
    const { user } = request;
    return this.projectsService.findAll(user);
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: RequestWithUser) {
    const { user } = request;
    return this.projectsService.findOne(id, user);
  }

  @ApiOkResponse()
  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    return this.projectsService.update(id, updateProjectDto, user);
  }
  @ApiOkResponse()
  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    const { user } = request;
    return this.projectsService.remove(id, user);
  }
}
