import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../app-state";
import * as fromToastActions from '../../actions/_toast.actions';
import * as fromRouteActions from '../../actions/_route.actions';
import { _Route } from "../../models/_route";

declare let sessionStorage;

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {
  constructor(
    private store: Store<AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.appendAuth(req, next);
  }

  appendAuth(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getHeadersValues().mergeMap(([authToken, login]) => {
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
        )
        .do(
          () => {},
          (err: any) => {
            if (this.checkIfAuthError(err)) this.handleAuthError();
          }
        );
    });
  }

  checkIfAuthError(err: any): boolean {
    if (!err.url) {
      return false;
    } else if ((err instanceof HttpErrorResponse) && !err.url.includes('login')) {
      return err.status === 401 || err.status === 403;
    } else {
      return false;
    }
  }

  handleAuthError(): void {
    this.store.dispatch(new fromToastActions.Show(
      'Błąd autoryzacji, przekierowanie do strony logowania...'
    ));
    setTimeout(() => {
      this.store.dispatch(
        new fromRouteActions.Root(new _Route('welcome'))
      );
    }, 4000);
  }

  getHeadersValues(): Observable<any[]> {
    return Observable.combineLatest(
      Observable.of(sessionStorage.__th),
      Observable.of(sessionStorage.__mail)
    );
  }
}
