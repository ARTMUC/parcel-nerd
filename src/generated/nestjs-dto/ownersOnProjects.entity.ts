
import {ProjectEntity} from './project.entity'
import {OwnerEntity} from './owner.entity'


export class OwnersOnProjectsEntity {
  project?: ProjectEntity ;
projectId: string ;
owner?: OwnerEntity ;
ownerId: string ;
assignedAt: Date ;
}
