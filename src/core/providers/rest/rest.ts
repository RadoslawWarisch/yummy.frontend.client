import { Injectable } from "@angular/core";
import { Api } from "../api/api";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { AppConfig } from "../../../app/app.config";

export interface LoginUserBody {
  email: string;
  password: string;
}

export interface GetPlacesBody {
  coordinates: {
    user: {
      lat: number,
      lng: number
    },
    focus: {
      lat: number,
      lng: number
    }
  };
  page: number;
  size: number;
}

export interface SubmitBucketBody {
  transactions: {
    offerId: number | string;
    count: number;
  }[];
  receiveTimestamp: Date;
}

@Injectable()
export class Rest extends Api {
  private config: any;

  constructor(public http: HttpClient) {
    super(http);
    this.config = AppConfig.rest;
  }

  private parseUrl(endpoint: string): string {
    let { rootUrl: root } = this.config;

    return `${root}/${endpoint}`;
  }

  public checkBearer(): Observable<any> {
    return this.get(this.parseUrl("user/bearer"));
  }

  public loginUser(body: LoginUserBody): Observable<any> {
    return this.post(this.parseUrl("login"), body);
  }

  public createUser(body: LoginUserBody): Observable<any> {
    return this.post(this.parseUrl("user/create"), body);
  }

  public getUserInfo(): Observable<any> {
    return this.get(this.parseUrl("user/info"));
  }

  public getPlaces(body: GetPlacesBody): Observable<any> {
    return this.post(this.parseUrl("restaurants/nearest"), body);
  }

  public getSinglePlace(id: string): Observable<any> {
    return this.get(this.parseUrl(`restaurant?id=${id}`));
  }

  public getOffers(id: string): Observable<any> {
    return this.get(this.parseUrl(`offers${id ? "?id=" + id : ''}`));
  }

  public submitBucket(body: SubmitBucketBody): Observable<any> {
    return this.post(this.parseUrl("transaction"), body);
  }

  public getTransactions(
    page: number = 0,
    size: number = 8
  ): Observable<any> {
    return this.get(this.parseUrl("orders"), {
      page: page,
      size: size
    });
  }
}
