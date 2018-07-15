import { Injectable } from "@angular/core";
import { Rest, GetPlacesBody } from "../rest/rest";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class PlaceProvider {

  constructor(private rest: Rest) {}

  public fetchPlaces(config: GetPlacesBody) {
    return this.rest.getPlaces(config)
      .map((res) => res.restaurants)
      .catch((err: HttpErrorResponse) => Observable.of(err));
  }
}