import IBill from "../../../../interfaces/IBill";
import IClient from "../../../../interfaces/IClient";
import IContract from "../../../../interfaces/IContract";
import ID from "../../../../interfaces/ID";
import IProduct from "../../../../interfaces/IProduct";
import IProvider from "../../../../interfaces/IProvider";
import IUser from "../../../../interfaces/IUser";

export interface ProviderProductMockDb extends ID {
  deliveryDays: number;
}

export interface BillIDInfo {
  // TODO: add owner ID to IBill interface?
  userID: number;
  billID: number;
}

export interface ContractMockDb
  extends Omit<IContract, "sellerBill" | "buyerBill"> {
  sellerBill: BillIDInfo;
  buyerBill: BillIDInfo;
}

export interface MockDbData {
  users: IUser[];
  providers: IProvider[];
  providerProducts: ProviderProductMockDb[][];
  products: IProduct[];
  clients: IClient[];
  bills: IBill[][]; // TODO: don't store owner name in bill
  contracts: ContractMockDb[];
}
