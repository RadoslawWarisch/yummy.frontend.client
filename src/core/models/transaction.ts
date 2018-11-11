import { Offer } from "./offer";

export class Transaction {
  constructor(
    transaction: Transaction
  ) {
    Object.assign(this, transaction);
  }

  public id: string;
  public name: string;
  public status: string;
  public orderTime: string;
  public orderDate: string;
  public receiveTime?: string;
  public receiveDate?: string;
  public price: number;
  public discount: number;
  public orderItemList: Offer[];
  public calculatedPrice?: number;
  public paymentCode: number;
  public state: TransactionStatus;
  public isExpanded?: boolean = false;
}

export enum TransactionStatus {
  MISSED = "MISSED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}