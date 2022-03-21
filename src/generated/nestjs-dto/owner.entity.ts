
import {ParcelEntity} from './parcel.entity'
import {UserEntity} from './user.entity'


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
}
