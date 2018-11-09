import { filter, map, pluck } from "rxjs/operators";
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../core/app-state";
import * as fromRouteAction from "../../core/actions/_route.actions";
import { Observable } from "rxjs";
import { _Route } from "../../core/models/_route";
import { MenuController } from "ionic-angular";
import { Startup } from "../../app/app.startup";

@Component({
  selector: "yummy-header",
  templateUrl: "yummy-header.html"
})
export class YummyHeaderComponent {
  public bucketCount$: Observable<number>;
  public routeName: string;

  constructor(
    private store: Store<AppState>,
    private menuCtrl: MenuController,
    private startup: Startup
  ) {}

  ngOnInit() {
    this.bucketCount$ = this.store.select("bucket").pipe(pluck("count"));
    this.store
      .select("_route")
      .pipe(
        pluck("data"),
        map((routes: _Route[]) => routes[routes.length - 1]),
        filter((route: _Route) => route !== undefined),
        pluck("name"),
        map(
          (route: string) =>
            route === "initial" ? this.startup.startPage : route
        )
      )
      .subscribe((route) => this.updateRoute(route));
  }

  public switchPage(page: string): void {
    this.store.dispatch(new fromRouteAction.Root(new _Route(page)));
  }

  public goToBucket(): void {
    this.store.dispatch(
      new fromRouteAction.Push({
        name: "bucket"
      })
    );
  }

  public backOrMenu(): void {
    this.routeName === "map" ||
    this.routeName === "list" ||
    this.routeName === "code" ||
    this.routeName === "offers"
      ? this.menuCtrl.toggle()
      : this.store.dispatch(new fromRouteAction.Pop());
  }

  private updateRoute(route: string): void {
    console.log('new route', this.routeName, route)
    this.routeName === 'welcome' 
      ? setTimeout(() => this.routeName = route, 125)
      : this.routeName = route;
  }
}
