
import {UserEntity} from './user.entity'
import {LineEntity} from './line.entity'
import {ParcelEntity} from './parcel.entity'
import {OwnerEntity} from './owner.entity'


export class ProjectEntity {
  id: string ;
title: string ;
content: string ;
user?: UserEntity ;
userId: string ;
lines?: LineEntity[] ;
parcels?: ParcelEntity[] ;
owners?: OwnerEntity[] ;
}
