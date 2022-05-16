import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateLineCoordsDto } from './create-lineCoords.dto';

export class ResponceLineDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  projectId: string;

  @ApiProperty({ type: [CreateLineCoordsDto] })
  lineCoords: CreateLineCoordsDto[];
}
