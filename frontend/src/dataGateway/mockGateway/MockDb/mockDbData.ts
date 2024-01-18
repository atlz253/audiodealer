import IBill from "../../../../../common/interfaces/IBill";
import IClient from "../../../../../common/interfaces/IClient";
import ID from "../../../../../common/interfaces/ID";
import IProduct from "../../../../../common/interfaces/IProduct";
import IProvider from "../../../../../common/interfaces/IProvider";
import IUser from "../../../../../common/interfaces/IUser";

export interface IProviderProductMockDb extends ID {
  deliveryDays: number;
}

export interface MockDbData {
  users: IUser[],
  providers: IProvider[],
  providerProducts: IProviderProductMockDb[][],
  products: IProduct[],
  clients: IClient[],
  bills: IBill[][]
}