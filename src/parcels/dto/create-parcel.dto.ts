import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CreateParcelBoundsDto } from './create-parcelBounds.dto';

export enum StatusName {
  'APPROVED' = 'Approved',
  'REJECTED' = 'Rejected',
  'WARNING' = 'Warning',
  'OPEN' = 'Open',
  'IRRELEVANT' = 'Irrelevant'
}

export class CreateParcelDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parcelNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  voivodeship: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  county: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  commune: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  KW?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  class?: string;

  @ApiProperty({ type: [CreateParcelBoundsDto] })
  @IsNotEmpty()
  parcelBounds: CreateParcelBoundsDto[];

  @ApiProperty()
  @IsEnum({ type: StatusName })
  statusName: StatusName;
}
