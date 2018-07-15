import { Injectable } from "@angular/core";
import { Api } from "../api/api";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { AppConfig } from "../../../app/app.config";
import { GeolocationItem } from "../../models/geolocation";

export interface LoginUserBody {
  email: string;
  password: string;
}

export interface GetPlacesBody {
  coordinates: GeolocationItem;
  page: number;
  size: number;
}

@Injectable()
export class Rest extends Api {
  private config: any;

  constructor(public http: HttpClient) {
    super(http);
    this.config = AppConfig.rest;
  }

  parseUrl(endpoint: string): string {
    let { rootUrl: root } = this.config;

    return `${root}/${endpoint}`;
  }

  loginUser(body: LoginUserBody): Observable<any> {
    return this.post(this.parseUrl("login"), body);
  }

  getPlaces(body: GetPlacesBody): Observable<any> {
    return this.post(this.parseUrl("restaurants/nearest"), body);
  }

}
