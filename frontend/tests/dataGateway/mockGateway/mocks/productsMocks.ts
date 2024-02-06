import IProduct from "../../../../../common/interfaces/IProduct";
import { MockDbData } from "../../../../src/dataGateway/mockGateway/MockDb/mockDbData";

const existProductID = 0;
const notExistProductID = 999;

function getProductsMockDbData(): MockDbData {
  return {
    users: [],
    providers: [],
    providerProducts: [],
    products: [
      {
        id: existProductID,
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

export function getProductMock(): IProduct {
  return {
    id: notExistProductID,
    name: "Product demo",
    description: "Demo product from getProduct",
    manufacturer: "getProduct",
    category: "Demo products from getProduct",
    price: 1000,
    quantity: 3,
  };
}

export default {
  getProductMock,
  getProductsMockDbData,
  existProductID,
  notExistProductID,
} as const;
