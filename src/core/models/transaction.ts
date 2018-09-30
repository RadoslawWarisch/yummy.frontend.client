export class Transaction {
  constructor(
    transaction: Transaction
  ) {
    Object.assign(this, transaction);
  }

  public id: string;
  public name: string;
  public status: string;
  public orderDate: string;
  public price: number;
  public paymentCode: number;
  public state: TransactionStatus;
  //public isLoaded?: boolean;
}

export enum TransactionStatus {
  MISSED = "MISSED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}