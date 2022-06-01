
import {LineCoordsEntity} from './lineCoords.entity'
import {ProjectEntity} from './project.entity'


export class LineEntity {
  id: string ;
title: string ;
lineCoords?: LineCoordsEntity[] ;
project?: ProjectEntity ;
projectId: string ;
}
