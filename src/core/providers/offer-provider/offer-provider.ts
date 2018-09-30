import { Injectable } from "@angular/core";
import { Rest } from "../rest/rest";

import { Observable } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class OfferProvider {
  constructor(
    private rest: Rest
  ) {}

  public getOffers({ restaurantId }): Observable<any> {
    return this.rest
      .getOffers(restaurantId)
      .catch((err: HttpErrorResponse) => Observable.of(err));
  }
}
