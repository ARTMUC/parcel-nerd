
import {ParcelEntity} from './parcel.entity'
import {UserEntity} from './user.entity'
import {ProjectEntity} from './project.entity'


export class OwnerEntity {
  id: string ;
name: string ;
surname: string ;
streetName: string  | null;
homeNumber: string  | null;
city: string  | null;
postalCode: string  | null;
parcels?: ParcelEntity[] ;
user?: UserEntity  | null;
userId: string  | null;
project?: ProjectEntity  | null;
projectId: string  | null;
}
