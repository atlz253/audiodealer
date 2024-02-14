import IDeliveryDays from "../../../../../common/interfaces/IDeliveryDays";
import IProduct from "../../../../../common/interfaces/IProduct";
import { MockDbData } from "../../../../src/dataGateway/mockGateway/MockDb/mockDbData";

const existProviderID = 0;
const notExistProviderID = 999;
const existProductID = 0;
const notExistProductID = 999;
const inExistProviderProductsProductID = existProductID;
const notInExistProviderProductsProductID = 1;
const deliveryDaysMockCount = 30;

function getProviderProductsMockDb(): MockDbData {
  return {
    users: [],
    providers: [
      {
        id: existProviderID,
        name: "First",
        phone: "+1234567890",
        address: "4850 Alyson Trail, Hialeah, Louisiana 60620, United States",
        added: "2023-05-10T21:00:00.000Z",
      },
    ],
    providerProducts: [
      [
        {
          id: existProductID,
          deliveryDays: 10,
        },
        {
          id: 2,
          deliveryDays: 30,
        },
      ],
    ],
    products: [
      {
        id: existProductID,
        name: "First demo product",
        description: "This is first demo product",
        manufacturer: "Manufacturer",
        category: "Demo products",
        price: 100,
        quantity: 10,
      },
      {
        id: notInExistProviderProductsProductID,
        name: "Second demo product",
        description: "This is second demo product",
        manufacturer: "Manufacturer",
        category: "Demo products",
        price: 150,
        quantity: 30,
      },
      {
        id: 2,
        name: "Third demo product",
        description: "This is third demo product",
        manufacturer: "Manufacturer",
        category: "Demo products",
        price: 120,
        quantity: 5,
      },
    ],
    clients: [],
    bills: [],
  };
}

function getDeliveryDays(): IDeliveryDays {
  return { deliveryDays: deliveryDaysMockCount };
}

const getTestExpectProviderProducts: ReadonlyArray<IProduct> = [
  {
    id: existProductID,
    name: "First demo product",
    description: "This is first demo product",
    manufacturer: "Manufacturer",
    category: "Demo products",
    price: 100,
    quantity: 10,
    deliveryDays: 10,
  },
  {
    id: 2,
    name: "Third demo product",
    description: "This is third demo product",
    manufacturer: "Manufacturer",
    category: "Demo products",
    price: 120,
    quantity: 5,
    deliveryDays: 30,
  },
];

const addTestExpectProviderProducts: ReadonlyArray<IProduct> = [
  {
    id: existProductID,
    name: "First demo product",
    description: "This is first demo product",
    manufacturer: "Manufacturer",
    category: "Demo products",
    price: 100,
    quantity: 10,
    deliveryDays: 10,
  },
  {
    id: 2,
    name: "Third demo product",
    description: "This is third demo product",
    manufacturer: "Manufacturer",
    category: "Demo products",
    price: 120,
    quantity: 5,
    deliveryDays: 30,
  },
  {
    id: notInExistProviderProductsProductID,
    name: "Second demo product",
    description: "This is second demo product",
    manufacturer: "Manufacturer",
    category: "Demo products",
    price: 150,
    quantity: 30,
    deliveryDays: deliveryDaysMockCount,
  },
];

const deleteTestExpectProviderProducts: ReadonlyArray<IProduct> = [
  {
    id: 2,
    name: "Third demo product",
    description: "This is third demo product",
    manufacturer: "Manufacturer",
    category: "Demo products",
    price: 120,
    quantity: 5,
    deliveryDays: 30,
  },
];

export default {
  getProviderProductsMockDb,
  getDeliveryDays,
  existProviderID,
  notExistProviderID,
  existProductID,
  notExistProductID,
  inExistProviderProductsProductID,
  notInExistProviderProductsProductID,
  getTestExpectProviderProducts,
  addTestExpectProviderProducts,
  deleteTestExpectProviderProducts,
} as const;
