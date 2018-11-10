export class Offer {
  constructor(offer: Offer) {
    Object.assign(this, offer);
  }

  public id: string | number = '';
  public name: string = '';
  public restaurantId: string | number = '';
  public image: string = null;
  public description?: string = '';
  public price?: number = null;
  public calculatedPrice?: number = null;
  public discount?: number = null;
  public count?: number = null;
  public receiveTimeStart?: number;
  public receiveTimeEnd?: number;
  public startDate?: string;
  public endDate?: string;
  public isExpanded?: boolean = false;
}

