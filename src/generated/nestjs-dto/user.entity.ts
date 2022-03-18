
import {ProjectEntity} from './project.entity'


export class UserEntity {
  id: string ;
email: string ;
name: string ;
password: string ;
isEmailConfirmed: boolean ;
emailConfirmationToken: string ;
projects?: ProjectEntity[] ;
}
