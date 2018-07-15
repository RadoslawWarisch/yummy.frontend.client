import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Api {
  constructor(public http: HttpClient) {}

  get(url: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(url, reqOpts);
  }

  post(url: string, body: any, reqOpts?: any) {
    return this.http.post(url, body, reqOpts);
  }

  put(url: string, body: any, reqOpts?: any) {
    return this.http.put(url, body, reqOpts);
  }

  delete(url: string, reqOpts?: any) {
    return this.http.delete(url, reqOpts);
  }

  patch(url: string, body: any, reqOpts?: any) {
    return this.http.put(url, body, reqOpts);
  }

}
