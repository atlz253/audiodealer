import IProduct from "../../../../../common/interfaces/IProduct";
import { MockDbData } from "../../../../src/dataGateway/mockGateway/MockDb/mockDbData";

export const providerProductsMock: MockDbData = { // TODO: getProviderProductsMock
  users: [],
  providers: [
    {
      id: 0,
      name: "First",
      phone: "+1234567890",
      address: "4850 Alysson Trail, Hialeah, Louisiana 60620, United States",
      added: "2023-05-10T21:00:00.000Z",
    },
  ],
  providerProducts: [
    [
      {
        id: 0,
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
      id: 0,
      name: "First demo product",
      description: "This is first demo product",
      manufacturer: "Manufacturer",
      category: "Demo products",
      price: 100,
      quantity: 10,
    },
    {
      id: 1,
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

export const getTestExpectProviderProducts: IProduct[] = [
  {
    id: 0,
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

export const addTestExpectProviderProducts: IProduct[] = [
  {
    id: 0,
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
    id: 1,
    name: "Second demo product",
    description: "This is second demo product",
    manufacturer: "Manufacturer",
    category: "Demo products",
    price: 150,
    quantity: 30,
    deliveryDays: 5,
  },
];

export const deleteTestExpectProviderProducts: IProduct[] = [
  {
    id: 0,
    name: "First demo product",
    description: "This is first demo product",
    manufacturer: "Manufacturer",
    category: "Demo products",
    price: 100,
    quantity: 10,
    deliveryDays: 10,
  },
];
