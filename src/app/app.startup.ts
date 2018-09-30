import { Injectable } from "@angular/core";
import { Rest } from "../core/providers/rest/rest";

declare const localStorage;

@Injectable()
export class Startup {
  public startPage: string;

  constructor(private rest: Rest) {}

  public init(): Promise<void> {
    return Promise.all([this.checkIsDemoDone(), this.checkBearer()]).then(
      ([isDemoDone, isBearer]) => {
        if (!isDemoDone) {
          this.startPage = "slide";
          localStorage.setItem("isDemoDone", "true");
        } else if (isBearer) {
          this.startPage = "map";
        } else {
          this.startPage = "welcome";
        }
        return Promise.resolve();
      }
    );
  }

  private checkIsDemoDone(): Promise<boolean> {
    return Promise.resolve(localStorage.getItem("isDemoDone") === "true");
  }

  private checkBearer(): Promise<boolean> {
    return this.rest
      .checkBearer()
      .map(() => true)
      .toPromise()
      .catch(() => false);
  }
}
