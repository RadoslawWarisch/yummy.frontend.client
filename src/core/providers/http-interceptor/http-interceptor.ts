
import {of as observableOf, combineLatest as observableCombineLatest,  Observable } from 'rxjs';

import {tap, mergeMap} from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import * as fromToastActions from "../../actions/_toast.actions";
import * as fromRouteActions from "../../actions/_route.actions";
import { _Route } from "../../models/_route";

declare let sessionStorage;

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {
  private throttle = (func, limit) => {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  constructor(private store: Store<AppState>) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.appendAuth(req, next);
  }

  private appendAuth(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getHeadersValues().pipe(mergeMap(([authToken, login]) => {
      return next
        .handle(
          req.clone(
            authToken && login && !req.url.includes("login")
              ? {
                  setHeaders: {
                    Authorization: authToken,
                    Email: login
                  }
                }
              : {}
          )
        ).pipe(
        tap(
          () => {},
          (err: any) => {
            if (this.checkIfAuthError(err)) {
              this.throttle(this.handleAuthError(), 1500);
            } 
          }
        ));
    }));
  }

  private checkIfAuthError(err: any): boolean {
    if (!err.url) {
      return false;
    } else if (
      err instanceof HttpErrorResponse &&
      !err.url.includes("login") &&
      !err.url.includes("bearer") &&
      !err.url.includes("create")
    ) {
      return err.status === 401 || err.status === 403;
    } else {
      return false;
    }
  }

  private handleAuthError(): void {
    this.store.dispatch(
      new fromToastActions.Show(
        "Błąd autoryzacji, przekierowanie do strony logowania..."
      )
    );
    setTimeout(() => {
      this.store.dispatch(new fromRouteActions.Root(new _Route("welcome")));
    }, 4000);
  }

  private getHeadersValues(): Observable<any[]> {
    return observableCombineLatest(
      observableOf(sessionStorage.__th),
      observableOf(sessionStorage.__mail)
    );
  }
}
