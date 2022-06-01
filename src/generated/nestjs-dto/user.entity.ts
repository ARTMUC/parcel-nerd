
import {ProjectEntity} from './project.entity'
import {ParcelEntity} from './parcel.entity'
import {OwnerEntity} from './owner.entity'


export class UserEntity {
  id: string ;
email: string ;
name: string ;
password: string ;
isEmailConfirmed: boolean ;
emailConfirmationToken: string ;
projects?: ProjectEntity[] ;
parcels?: ParcelEntity[] ;
owners?: OwnerEntity[] ;
}
