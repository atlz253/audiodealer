import IBill from "../../../../../common/interfaces/IBill";
import { BillIDInfo, MockDbData } from "../../../../../common/src/dataGateway/mockGateway/MockDb/mockDbData";

const existUserID = 0;
const uniqueBillNumber = "50779872200000009999";

const existBillMockInfo: Readonly<BillIDInfo> = {
  userID: existUserID,
  billID: 0,
};

const notExistBillMockInfo: Readonly<BillIDInfo> = {
  userID: existUserID,
  billID: 999,
};

const notExistUserBillMockInfo: Readonly<BillIDInfo> = {
  userID: 999,
  billID: 0,
};

function getBillsMock(): MockDbData {
  return {
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
      ],
    ],
    contracts: []
  };
}

function getBill(): IBill {
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

export default {
  getBillsMock,
  getBill,
  existUserID,
  uniqueBillNumber,
  existBillMockInfo,
  notExistBillMockInfo,
  notExistUserBillMockInfo,
} as const;
