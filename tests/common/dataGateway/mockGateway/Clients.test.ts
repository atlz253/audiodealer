import Clients from "../../../../common/src/dataGateway/mockGateway/Clients";
import MockDb from "../../../../common/src/dataGateway/mockGateway/MockDb/MockDb";
import { default as mocks } from "./mocks/clientsMocks";
import { default as errorMessages } from "../../../../common/src/dataGateway/errors/ClientsErrorsMessages";

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
    const { existClientID } = mocks;
    const client = await Clients.GetByID(existClientID);
    const clientFromDb = MockDb.Clients[existClientID];
    expect(client).toBeClone(clientFromDb);
  });

  test("GetByID should throw error if user with given ID not exists", async () => {
    const { notExistClientID } = mocks;
    const errorMessage =
      errorMessages.getClientWithGivenIDNotFoundMessage(notExistClientID);
    await expect(Clients.GetByID(notExistClientID)).rejects.toThrow(
      errorMessage,
    );
  });

  test("GetCount should return clients array length", async () => {
    const clientsCount = await Clients.GetCount();
    expect(clientsCount).toEqual(MockDb.Clients.length);
  });

  test("Create should push client clone to clients array and return client ID", async () => {
    const newClient = mocks.getClientMock();
    const { id: newClientID } = await Clients.Create(newClient);
    newClient.id = newClientID;
    const clientFromDb = MockDb.Clients[newClientID];
    expect(clientFromDb).toBeClone(newClient);
  });

  test("Save should save client clone to clients array", async () => {
    const client = await Clients.GetByID(mocks.existClientID);
    client.name = "NewClientName";
    await Clients.Save(client);
    const clientFromDb = MockDb.Clients[client.id];
    expect(clientFromDb).toBeClone(client);
  });

  test("Save should throw error if client not exists in clients array", async () => {
    const newClient = mocks.getClientMock();
    const errorMessage = errorMessages.getClientWithGivenIDNotFoundMessage(
      newClient.id,
    );
    await expect(Clients.Save(newClient)).rejects.toThrow(errorMessage);
  });

  test("Delete should delete client from clients array", async () => {
    const { existClientID } = mocks;
    const clientFromDb = MockDb.Clients[existClientID];
    expect(clientFromDb).not.toBeUndefined();
    await Clients.Delete(existClientID);
    const clientSearchResult = MockDb.Clients[existClientID];
    expect(clientSearchResult).toBeUndefined();
  });

  test("Delete should throw error if client not exists in clients array", async () => {
    const { notExistClientID } = mocks;
    const errorMessage =
      errorMessages.getClientWithGivenIDNotFoundMessage(notExistClientID);
    await expect(Clients.Delete(mocks.notExistClientID)).rejects.toThrow(
      errorMessage,
    );
  });
});
