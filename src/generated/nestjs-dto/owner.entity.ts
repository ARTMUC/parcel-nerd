
import {ParcelEntity} from './parcel.entity'


export class OwnerEntity {
  id: string ;
name: string ;
surname: string ;
streetName: string  | null;
homeNumber: string  | null;
city: string  | null;
postalCode: string  | null;
parcels?: ParcelEntity[] ;
projectId: string  | null;
}
