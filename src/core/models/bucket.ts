import { Offer } from "./offer";

export class Bucket {
  constructor(bucket: Bucket) {
    Object.assign(this, bucket);
  }

  public offers: Offer[];
  public count?: number;
  public price?: number;
  public restaurantId?: string | number;
}