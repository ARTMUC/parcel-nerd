
import {ParcelBoundsEntity} from './parcelBounds.entity'
import {OwnerEntity} from './owner.entity'
import {ProjectEntity} from './project.entity'


export class ParcelEntity {
  id: string ;
parcelNumber: string ;
voivodeship: string ;
county: string ;
commune: string ;
KW: string  | null;
class: string  | null;
parcelBounds?: ParcelBoundsEntity[] ;
owners?: OwnerEntity[] ;
project?: ProjectEntity  | null;
projectId: string  | null;
}
