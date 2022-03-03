import { ParcelBounds } from './parcel-boundaries.type';

export interface ParcelInfo {
  id: string;
  voivodeship: string;
  county: string;
  commune: string;
  boundCoords: ParcelBounds;
}
