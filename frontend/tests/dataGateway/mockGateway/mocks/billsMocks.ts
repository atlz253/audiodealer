import IBill from "../../../../../common/interfaces/IBill";
import { MockDbData } from "../../../../src/dataGateway/mockGateway/MockDb/mockDbData";

export const billsMock: MockDbData = { // TODO: getBillsMock
  users: [],
  providers: [],
  providerProducts: [],
  products: [],
  clients: [],
  bills: [
    [
      {
        id: 0,
        billNumber: "50779872200000001111",
        correspondentBill: "50759145900000001111",
        BIC: "405971111",
        INN: "255621111",
        ownerName: "Demo user",
        bankName: "Demo bank",
        expireDate: "2027-11-22T21:00:00.000Z",
      },
    ]
  ],
};

export function getBill(): IBill {
  return {
    id: 0,
    billNumber: "50779872200000001112",
    correspondentBill: "50759145900000001112",
    BIC: "405971112",
    INN: "255621112",
    ownerName: "Demo user",
    bankName: "Demo bank",
    expireDate: "2027-11-23T21:00:00.000Z",
  };
}
