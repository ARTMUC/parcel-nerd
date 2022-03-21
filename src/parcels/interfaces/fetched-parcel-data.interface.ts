import { FetchedParcelBounds } from './fetched-parcel-bounds.interface';

export interface FetchedParcelData {
  parcelNumber: string;
  voivodeship: string;
  county: string;
  commune: string;
  parcelBounds: FetchedParcelBounds; // [{x:number,y:number}] change type
}
