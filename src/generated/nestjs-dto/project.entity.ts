
import {UserEntity} from './user.entity'
import {LineEntity} from './line.entity'
import {ParcelEntity} from './parcel.entity'


export class ProjectEntity {
  id: string ;
title: string ;
content: string ;
user?: UserEntity ;
userId: string ;
lines?: LineEntity[] ;
parcels?: ParcelEntity[] ;
}
