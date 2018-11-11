import { of as observableOf, Observable } from "rxjs";

import { catchError, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Rest } from "../rest/rest";
import { HttpErrorResponse } from "@angular/common/http";
import { Transaction } from "../../models/transaction";
import { format } from "date-fns";
import { Offer } from "../../models/offer";

@Injectable()
export class TransactionsProvider {
  constructor(private rest: Rest) {}

  public getTransactions(): Observable<any> {
    return this.rest
      .getTransactions()
      .pipe(
        map((res: any) => ({
          ...res,
          currentOrderList: res.currentOrderList.map(this.parseTransaction)
        })),
        catchError((err: HttpErrorResponse) => observableOf(err))
      );
  }

  private parseTransaction(unparsed: Transaction): Transaction {
    const calculatePrice = (unparsedOffer: Offer) => {
      return Math.round(unparsedOffer.price*(100 - unparsedOffer.discount)/10)/10;
    }

    return {
      ...unparsed,
      orderItemList: unparsed.orderItemList.map((offer: Offer) => ({
        ...offer,
        calculatedPrice: calculatePrice(offer)
      })),
      receiveTime: format(unparsed.receiveTime, 'H:mm'),
      receiveDate: format(unparsed.receiveTime, 'D/MM'),
      orderTime: format(unparsed.orderTime, 'H:mm'),
      orderDate: format(unparsed.orderTime, 'D/MM')
    }
  }
}
