import IProvider from "../../../../../common/interfaces/IProvider";
import { MockDbData } from "../../../../../common/src/dataGateway/mockGateway/MockDb/mockDbData";

const existProviderID = 0;
const notExistProviderID = 999;

function getProvidersMockDb(): MockDbData {
  return {
    users: [],
    providers: [
      {
        id: existProviderID,
        name: "First",
        phone: "+1234567890",
        address: "4852 Alyson Trail, Hialeah, Louisiana 60623, United States",
        added: "2023-05-10T21:00:00.000Z",
      },
      {
        id: 1,
        name: "Second",
        phone: "+1234567891",
        address: "716 Simon's Park, Hawaii 11086-8398, United States",
        added: "2023-06-15T15:00:00.000Z",
      },
      {
        id: 2,
        name: "Third",
        phone: "+1234567892",
        address: "55894 Hermits Plaza, Ohio 34978-5645, United States",
        added: "2023-07-11T13:00:00.000Z",
      },
    ],
    providerProducts: [],
    products: [],
    clients: [],
    bills: [],
  };
}

function getProvider(): IProvider {
  return {
    id: 999,
    name: "New provider",
    phone: "+1098765444",
    address: "34804 Bosch Plain, Sabina, New York 69432, United States",
    added: "2022-04-11T13:00:00.000Z",
  };
}

export default {
  getProvidersMockDb,
  getProvider,
  existProviderID,
  notExistProviderID
} as const;
