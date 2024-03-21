import ICheque from "../../../../../common/interfaces/ICheque";
import IContract from "../../../../../common/interfaces/IContract";
import { MockDbData } from "../../../../../common/src/dataGateway/mockGateway/MockDb/mockDbData";

const existContractID = 0;
const notExistContractID = 999;
const openContractsCount = 1;
const existChequeIDOfExistContractID = 0;

function getContractsMockDb(): MockDbData {
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
          billNumber: "50779832200000001111",
          correspondentBill: "53259145900000001111",
          BIC: "403971111",
          INN: "253621111",
          ownerName: "Demo user",
          bankName: "Demo bank",
          expireDate: "2030-11-22T21:00:00.000Z",
        },
      ],
      [
        {
          id: 1,
          billNumber: "50744872200000001111",
          correspondentBill: "50759144330000001111",
          BIC: "405972111",
          INN: "255622111",
          ownerName: "Demo client",
          bankName: "Demo bank2",
          expireDate: "2055-11-22T21:00:00.000Z",
        },
      ],
      [
        {
          id: 2,
          billNumber: "50744872212300001111",
          correspondentBill: "50759144330000001111",
          BIC: "412372111",
          INN: "212322111",
          ownerName: "Demo provider",
          bankName: "Demo bank3",
          expireDate: "2035-11-22T21:00:00.000Z",
        },
      ],
    ],
    contracts: [
      {
        id: existContractID,
        sellerBill: {
          userID: 0,
          billID: 0,
        },
        buyerBill: {
          userID: 1,
          billID: 1,
        },
        cheques: [
          {
            id: existChequeIDOfExistContractID,
            deliveryDate: "2024-02-26T12:00:00.000Z",
            type: "sell", // TODO: parse type from contracts
            status: "paid",
          },
          {
            id: 1,
            deliveryDate: "2024-02-27T12:00:00.000Z",
            type: "sell",
            status: "unpaid",
          },
          {
            id: 2,
            deliveryDate: "2024-02-28T12:00:00.000Z",
            type: "sell",
            status: "paid",
          },
        ],
        products: [],
        price: 0,
        created: "2024-02-21T01:19:00.000Z",
        type: "sell",
        status: "open",
      },
      {
        id: 1,
        sellerBill: {
          userID: 2,
          billID: 2,
        },
        buyerBill: {
          userID: 0,
          billID: 0,
        },
        cheques: [
          {
            id: 3,
            deliveryDate: "2024-03-12T12:00:00.000Z",
            type: "sell",
            status: "paid",
          },
        ],
        products: [],
        price: 0,
        created: "",
        type: "buy",
        status: "close",
      },
    ],
  };
}

const getTestExpectResult: DeepReadonly<IContract[]> = [
  {
    id: 0,
    sellerBill: {
      id: 0,
      billNumber: "50779832200000001111",
      correspondentBill: "53259145900000001111",
      BIC: "403971111",
      INN: "253621111",
      ownerName: "Demo user",
      bankName: "Demo bank",
      expireDate: "2030-11-22T21:00:00.000Z",
    },
    buyerBill: {
      id: 1,
      billNumber: "50744872200000001111",
      correspondentBill: "50759144330000001111",
      BIC: "405972111",
      INN: "255622111",
      ownerName: "Demo client",
      bankName: "Demo bank2",
      expireDate: "2055-11-22T21:00:00.000Z",
    },
    cheques: [
      {
        id: existChequeIDOfExistContractID,
        deliveryDate: "2024-02-26T12:00:00.000Z",
        type: "sell",
        status: "paid",
      },
      {
        id: 1,
        deliveryDate: "2024-02-27T12:00:00.000Z",
        type: "sell",
        status: "unpaid",
      },
      {
        id: 2,
        deliveryDate: "2024-02-28T12:00:00.000Z",
        type: "sell",
        status: "paid",
      },
    ],
    products: [],
    price: 0,
    created: "2024-02-21T01:19:00.000Z",
    type: "sell",
    status: "open",
  },
  {
    id: 1,
    sellerBill: {
      id: 2,
      billNumber: "50744872212300001111",
      correspondentBill: "50759144330000001111",
      BIC: "412372111",
      INN: "212322111",
      ownerName: "Demo provider",
      bankName: "Demo bank3",
      expireDate: "2035-11-22T21:00:00.000Z",
    },
    buyerBill: {
      id: 0,
      billNumber: "50779832200000001111",
      correspondentBill: "53259145900000001111",
      BIC: "403971111",
      INN: "253621111",
      ownerName: "Demo user",
      bankName: "Demo bank",
      expireDate: "2030-11-22T21:00:00.000Z",
    },
    cheques: [
      {
        id: 3,
        deliveryDate: "2024-03-12T12:00:00.000Z",
        type: "sell",
        status: "paid",
      },
    ],
    products: [],
    price: 0,
    created: "",
    type: "buy",
    status: "close",
  },
];

const getByIDTestExpectResult: DeepReadonly<IContract> = {
  id: 0,
  sellerBill: {
    id: 0,
    billNumber: "50779832200000001111",
    correspondentBill: "53259145900000001111",
    BIC: "403971111",
    INN: "253621111",
    ownerName: "Demo user",
    bankName: "Demo bank",
    expireDate: "2030-11-22T21:00:00.000Z",
  },
  buyerBill: {
    id: 1,
    billNumber: "50744872200000001111",
    correspondentBill: "50759144330000001111",
    BIC: "405972111",
    INN: "255622111",
    ownerName: "Demo client",
    bankName: "Demo bank2",
    expireDate: "2055-11-22T21:00:00.000Z",
  },
  cheques: [
    {
      id: existChequeIDOfExistContractID,
      deliveryDate: "2024-02-26T12:00:00.000Z",
      type: "sell",
      status: "paid",
    },
    {
      id: 1,
      deliveryDate: "2024-02-27T12:00:00.000Z",
      type: "sell",
      status: "unpaid",
    },
    {
      id: 2,
      deliveryDate: "2024-02-28T12:00:00.000Z",
      type: "sell",
      status: "paid",
    },
  ],
  products: [],
  price: 0,
  created: "2024-02-21T01:19:00.000Z",
  type: "sell",
  status: "open",
};

const getChequesWithoutParamsExpectResult: DeepReadonly<ICheque[]> = [
  {
    id: existChequeIDOfExistContractID,
    deliveryDate: "2024-02-26T12:00:00.000Z",
    type: "sell",
    status: "paid",
  },
  {
    id: 1,
    deliveryDate: "2024-02-27T12:00:00.000Z",
    type: "sell",
    status: "unpaid",
  },
  {
    id: 2,
    deliveryDate: "2024-02-28T12:00:00.000Z",
    type: "sell",
    status: "paid",
  },
  {
    id: 3,
    deliveryDate: "2024-03-12T12:00:00.000Z",
    type: "sell",
    status: "paid",
  },
];

const getChequesWithOpenStatusParamsExpectResult: DeepReadonly<ICheque[]> = [
  {
    id: existChequeIDOfExistContractID,
    deliveryDate: "2024-02-26T12:00:00.000Z",
    type: "sell", // TODO: parse type from contracts
    status: "paid",
  },
  {
    id: 2,
    deliveryDate: "2024-02-28T12:00:00.000Z",
    type: "sell",
    status: "paid",
  },
  {
    id: 3,
    deliveryDate: "2024-03-12T12:00:00.000Z",
    type: "sell",
    status: "paid",
  },
];

const getChequesWithCloseStatusParamsExpectResult: DeepReadonly<ICheque[]> = [
  {
    id: 1,
    deliveryDate: "2024-02-27T12:00:00.000Z",
    type: "sell",
    status: "unpaid",
  },
];

const getChequesWithGivenContractIDExpectResult: DeepReadonly<ICheque[]> = [
  {
    id: existChequeIDOfExistContractID,
    deliveryDate: "2024-02-26T12:00:00.000Z",
    type: "sell",
    status: "paid",
  },
  {
    id: 1,
    deliveryDate: "2024-02-27T12:00:00.000Z",
    type: "sell",
    status: "unpaid",
  },
  {
    id: 2,
    deliveryDate: "2024-02-28T12:00:00.000Z",
    type: "sell",
    status: "paid",
  },
];

const getChequesWithOpenStatusAndGivenContractIDExpectResult: DeepReadonly<
  ICheque[]
> = [
  {
    id: existChequeIDOfExistContractID,
    deliveryDate: "2024-02-26T12:00:00.000Z",
    type: "sell",
    status: "paid",
  },
  {
    id: 2,
    deliveryDate: "2024-02-28T12:00:00.000Z",
    type: "sell",
    status: "paid",
  },
];

export default {
  getContractsMockDb,
  existContractID,
  notExistContractID,
  openContractsCount,
  getTestExpectResult,
  getByIDTestExpectResult,
  getChequesWithoutParamsExpectResult,
  getChequesWithOpenStatusParamsExpectResult,
  getChequesWithCloseStatusParamsExpectResult,
  getChequesWithGivenContractIDExpectResult,
  getChequesWithOpenStatusAndGivenContractIDExpectResult,
} as const;
