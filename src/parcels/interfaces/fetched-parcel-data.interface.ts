import { StatusName } from '../dto/create-parcel.dto';
import { FetchedParcelBounds } from './fetched-parcel-bounds.interface';

export interface FetchedParcelData {
  parcelNumber: string;
  voivodeship: string;
  county: string;
  commune: string;
  parcelBounds: FetchedParcelBounds;
  statusName: StatusName;
}
