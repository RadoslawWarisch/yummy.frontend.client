export class Offer {
  constructor(offer: Offer) {
    Object.assign(this, offer);
    if (!offer.calculatedPrice) {
      this.calculatedPrice = calculatePrice(this.price, this.discount);
    }
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
}

const calculatePrice = (price, discount) => {
  return Math.round(price*(100 - discount)/10)/10;
}