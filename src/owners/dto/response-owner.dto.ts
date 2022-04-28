import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

class Parcel {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parcelNumber: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class OwnerResponse {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @IsString()
  streetName?: string;

  @ApiProperty()
  @IsString()
  homeNumber?: string;

  @ApiProperty()
  @IsString()
  city?: string;

  @ApiProperty()
  @IsString()
  postalCode?: string;

  @ApiProperty({ type: [Parcel] })
  @IsArray()
  parcels?: Parcel[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  projectId: string;
}
