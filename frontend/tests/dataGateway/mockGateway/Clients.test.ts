import Clients from "../../../src/dataGateway/mockGateway/Clients";
import MockDb from "../../../src/dataGateway/mockGateway/MockDb/MockDb";
import { default as mocks } from "./mocks/clientsMocks";

describe("Mock data gateway clients", () => {
  beforeEach(() => {
    const mockDbData = mocks.getClientsMockDb();
    MockDb.SetMockDbData(mockDbData);
  });

  test("Get should return clients array clone", async () => {
    const clients = await Clients.Get();
    expect(clients).toBeClone(MockDb.Clients);
  });

  test("GetByID should return client", async () => {
    const client = await Clients.GetByID(mocks.existClientID);
    const clientFromDb = MockDb.FindClientByID(mocks.existClientID);
    expect(client).toBeClone(clientFromDb);
  });

  test("GetByID should throw error if user with given ID not exists", async () => {
    await expect(Clients.GetByID(mocks.notExistClientID)).rejects.toThrow(
      `Client with ID ${mocks.notExistClientID} not found`,
    );
  });

  test("GetCount should return clients array length", async () => {
    const clientsCount = await Clients.GetCount();
    expect(clientsCount).toEqual(MockDb.Clients.length);
  });

  test("Create should push client clone to clients array", async () => {
    const newClient = mocks.getClientMock();
    const { id: newClientID } = await Clients.Create(newClient);
    newClient.id = newClientID;
    const clientFromDb = MockDb.FindClientByID(newClientID);
    expect(clientFromDb).toBeClone(newClient);
  });

  test("Save should save client clone to clients array", async () => {
    const client = await Clients.GetByID(mocks.existClientID);
    client.name = "NewClientName";
    await Clients.Save(client);
    const clientFromDb = MockDb.FindClientByID(client.id);
    expect(clientFromDb).toBeClone(client);
  });

  test("Save should throw error if client not exists in clients array", async () => {
    const newClient = mocks.getClientMock();
    await expect(Clients.Save(newClient)).rejects.toThrow(
      `Client with ID ${newClient.id} not found`,
    );
  });

  test("Delete should delete client from clients array", async () => {
    const clientFromDb = MockDb.FindClientByID(mocks.existClientID);
    expect(clientFromDb).not.toBeUndefined();
    await Clients.Delete(mocks.existClientID);
    const clientSearchResult = MockDb.FindClientByID(mocks.existClientID);
    expect(clientSearchResult).toBeUndefined();
  });

  test("Delete should throw error if client not exists in clients array", async () => {
    await expect(Clients.Delete(mocks.notExistClientID)).rejects.toThrow(
      `Client with ID ${mocks.notExistClientID} not found`,
    );
  });
});
