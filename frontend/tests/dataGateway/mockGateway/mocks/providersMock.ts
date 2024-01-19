import { MockDbData } from "../../../../src/dataGateway/mockGateway/MockDb/mockDbData";

export const providersMock: MockDbData = {
  users: [],
  providers: [
    {
      id: 0,
      name: "First",
      phone: "+1234567890",
      address: "4852 Alysson Trail, Hialeah, Louisiana 60623, United States",
      added: "2023-05-10T21:00:00.000Z",
    },
    {
      id: 1,
      name: "Second",
      phone: "+1234567891",
      address:
        "716 Simonis Park, Farrellhaven, Hawaii 11086-8398, United States",
      added: "2023-06-15T15:00:00.000Z",
    },
    {
      id: 2,
      name: "Third",
      phone: "+1234567892",
      address:
        "55894 Hermiston Plaza, Lake Julianneland, Ohio 34978-5645, United States",
      added: "2023-07-11T13:00:00.000Z",
    },
  ],
  providerProducts: [],
  products: [],
  clients: [],
  bills: [],
};
