import { MockDbData } from "../../../../src/dataGateway/mockGateway/MockDb/mockDbData";

export const adminAndDealerMock: MockDbData = { // TODO: getAdminAndDealerMock
  users: [
    {
      id: 0,
      type: "dealer",
      firstName: "Dealer",
    },
    {
      id: 1,
      type: "admin",
      firstName: "Admin",
    },
  ],
  providers: [],
  providerProducts: [],
  products: [],
  clients: [],
  bills: [],
};
