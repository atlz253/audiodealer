import IProduct from "../../../../../common/interfaces/IProduct";
import { MockDbData } from "../../../../src/dataGateway/mockGateway/MockDb/mockDbData";

// TODO: export default object instead of individual exports
export function getProductsMockDbData(): MockDbData {
  return {
    users: [],
    providers: [],
    providerProducts: [],
    products: [
      {
        id: 0,
        name: "Demo product",
        description: "This is demo product",
        manufacturer: "Manufacturer",
        category: "Demo products",
        price: 100,
        quantity: 10,
      },
    ],
    clients: [],
    bills: [],
  };
}

export const existProductID = 0;
export const notExistProductID = 999;

export function getProductMock(): IProduct {
  return {
    id: 0,
    name: "Product demo",
    description: "Demo product from getProduct",
    manufacturer: "getProduct",
    category: "Demo products from getProduct",
    price: 1000,
    quantity: 3,
  };
}
