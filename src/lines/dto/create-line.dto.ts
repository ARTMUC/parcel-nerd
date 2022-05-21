import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CreateLineCoordsDto } from './create-lineCoords.dto';

const systems = [
  'EPSG:2180',
  'EPSG:4326',
  'EPSG:2177',
  'EPSG:2179',
  'EPSG:2176',
  'EPSG:3120',
  'EPSG:2178',
  'EPSG:2174',
  'EPSG:2173',
  'EPSG:2172',
  'EPSG:2175',
  'EPSG:3328'
] as const;
export type CoordSystem = typeof systems[number];

export class CreateLineDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: [CreateLineCoordsDto] })
  @IsNotEmpty()
  lineCoords: CreateLineCoordsDto[];

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(systems)
  system: CoordSystem;
}
