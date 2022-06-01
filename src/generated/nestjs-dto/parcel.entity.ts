
import {ParcelBoundsEntity} from './parcelBounds.entity'
import {OwnerEntity} from './owner.entity'
import {ProjectEntity} from './project.entity'
import {UserEntity} from './user.entity'


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
user?: UserEntity  | null;
userId: string  | null;
statusName: number ;
}
