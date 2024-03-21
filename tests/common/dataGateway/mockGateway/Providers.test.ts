import IProvider from "../../../../common/interfaces/IProvider";
import MockDb from "../../../../common/src/dataGateway/mockGateway/MockDb/MockDb";
import Providers from "../../../../common/src/dataGateway/mockGateway/Providers";
import { default as mocks } from "./mocks/providersMocks";
import { default as errorMessages } from "../../../../common/src/dataGateway/errors/ProvidersErrorsMessages";

describe("Mock gateway providers", () => {
  beforeEach(() => {
    const mockDb = mocks.getProvidersMockDb();
    MockDb.SetMockDbData(mockDb);
  });

  test("Get should return providers array copy", async () => {
    const providers = await Providers.Get();
    expect(providers).toBeClone(MockDb.Providers);
  });

  test("GetByID should return provider copy with given ID", async () => {
    const { existProviderID } = mocks;
    const provider = await Providers.GetByID(existProviderID);
    const providerFromDb = MockDb.Providers[existProviderID];
    expect(provider).toBeClone(providerFromDb);
  });

  test("GetByID should throw error if provider not exists", async () => {
    const { notExistProviderID } = mocks;
    const errorMessage =
      errorMessages.getProviderWithGivenIDNotFoundMessage(notExistProviderID);
    await expect(Providers.GetByID(notExistProviderID)).rejects.toThrow(
      errorMessage,
    );
  });

  test("Count should return providers array count", async () => {
    const providersCount = await Providers.GetCount();
    expect(providersCount).toBe(MockDb.Providers.length);
  });

  test("Create should push provider clone to providers array and return provider ID", async () => {
    const { getProvider } = mocks;
    const newProvider: IProvider = getProvider();
    const { id: newProviderID } = await Providers.Create(newProvider);
    newProvider.id = newProviderID;
    const providerFromDb = MockDb.Providers[newProviderID];
    expect(providerFromDb).toBeClone(newProvider);
  });

  test("Save should save provider clone to providers array", async () => {
    const { existProviderID } = mocks;
    const providerForSave = await Providers.GetByID(existProviderID);
    providerForSave.name = "New provider name";
    await Providers.Save(providerForSave);
    const providerFromDb = MockDb.Providers[existProviderID];
    expect(providerFromDb).toBeClone(providerForSave);
  });

  test("Save should throw error if provider not exists", async () => {
    const { getProvider } = mocks;
    const providerForSave = getProvider();
    const errorMessage = errorMessages.getProviderWithGivenIDNotFoundMessage(
      providerForSave.id,
    );
    await expect(Providers.Save(providerForSave)).rejects.toThrow(errorMessage);
  });

  test("Delete should delete provider from providers array", async () => {
    const { existProviderID } = mocks;
    await Providers.Delete(existProviderID);
    const providerFindResult = MockDb.Providers[existProviderID];
    expect(providerFindResult).toBeUndefined();
  });

  test("Delete should throw error if provider not exists", async () => {
    const { notExistProviderID } = mocks;
    const errorMessage =
      errorMessages.getProviderWithGivenIDNotFoundMessage(notExistProviderID);
    await expect(Providers.Delete(notExistProviderID)).rejects.toThrow(
      errorMessage,
    );
  });
});
