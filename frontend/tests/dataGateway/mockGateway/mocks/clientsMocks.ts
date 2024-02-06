import IClient from "../../../../../common/interfaces/IClient";
import { MockDbData } from "../../../../src/dataGateway/mockGateway/MockDb/mockDbData";

const existClientID = 0;
const notExistClientID = 999;

function getClientsMockDb(): MockDbData {
  return {
    users: [],
    providers: [],
    providerProducts: [],
    products: [],
    clients: [
      {
        id: 0,
        name: "Client",
        email: "client@mail.com",
        birthday: "1997-11-23T21:00:00.000Z",
        address:
          "0230 Pfannerstill Trace, Hellerhaven, Georgia 60344-2808, United States",
        phone: "501-664-6100",
        added: "2023-11-23T21:00:00.000Z",
      },
    ],
    bills: [],
  };
}

function getClientMock(): IClient {
  return {
    id: notExistClientID,
    name: "ClientMock",
    email: "clientMock@mail.com",
    birthday: "1995-10-20T21:00:00.000Z",
    address:
      "2369 Baby Causeway, West Mableton, North Dakota 29158, United States",
    phone: "517-441-8340",
    added: "2023-12-23T21:00:00.000Z",
  };
}

export default {
  getClientsMockDb,
  getClientMock,
  existClientID,
  notExistClientID,
} as const;
