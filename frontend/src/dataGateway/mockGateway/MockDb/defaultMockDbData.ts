import { MockDbData } from "./mockDbData";

export const defaultMockDbData: MockDbData = {
  users: [
    {
      id: 0,
      type: "admin",
      firstName: "Administrator",
      login: "admin",
      password: "admin",
    },
    {
      id: 1,
      type: "user",
      firstName: "Demo user",
      login: "user",
      password: "user",
    },
  ],
  providers: [
    {
      id: 2,
      name: "Demo provider",
      phone: "+18005553535",
      address:
        "20855 Conroy Mill, Kertzmannton, Florida 31806-4125, United States",
      added: "2023-05-10T21:00:00.000Z",
    },
  ],
  providerProducts: [
    [
      /* Admin haven't got products */
    ],
    [
      /* User haven't got products */
    ],
    [
      {
        id: 0,
        deliveryDays: 10,
      },
    ],
  ],
  products: [
    {
      id: 0,
      name: "Demo product",
      manufacturer: "Demo manufacturer",
      description: "This is demo product",
      category: "Demo category",
      price: 100,
      quantity: 99,
    },
  ],
  clients: [
    {
      id: 3,
      name: "Demo client",
      email: "client@mail.com",
      birthday: "2023-12-11T21:00:00.000Z",
      address: "156 Michael Ct #4, Anchorage, Alaska 99504, USA",
      phone: "+1234567890",
      added: "2023-05-10T21:00:00.000Z",
    },
  ],
  bills: [
    [
      /* Admin haven't got bills */
    ],
    [
      {
        id: 0,
        billNumber: "50779872200000002973",
        correspondentBill: "50759145900000009232",
        BIC: "405978688",
        INN: "255625630",
        ownerName: "Demo user",
        bankName: "Demo bank",
        expireDate: "2026-10-22T21:00:00.000Z",
      },
    ],
    [
      {
        id: 1,
        billNumber: "50779872200000002972",
        correspondentBill: "50759145900000009231",
        BIC: "405978687",
        INN: "255625639",
        ownerName: "Demo provider",
        bankName: "Demo bank",
        expireDate: "2026-11-22T21:00:00.000Z",
      },
    ],
    [
      {
        id: 2,
        billNumber: "50779872200000002973",
        correspondentBill: "50759145900000009232",
        BIC: "405978688",
        INN: "255625630",
        ownerName: "Demo client",
        bankName: "Demo bank",
        expireDate: "2026-09-22T21:00:00.000Z",
      },
    ],
  ],
};