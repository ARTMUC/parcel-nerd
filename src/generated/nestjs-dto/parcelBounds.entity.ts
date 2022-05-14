import { ParcelEntity } from './parcel.entity';

export class ParcelBoundsEntity {
  id: number;
  x: number;
  y: number;
  parcel?: ParcelEntity;
  parcelId: string;
}
