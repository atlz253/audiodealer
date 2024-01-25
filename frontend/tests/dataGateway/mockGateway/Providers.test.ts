import IProvider from "../../../../common/interfaces/IProvider";
import Providers from "../../../src/dataGateway/mockGateway/Providers";
import { cloneAndSetMockDbData } from "./cloneAndSetMockDbData";
import { getProvider, providersMock } from "./mocks/providersMocks";

describe("Mock gateway providers", () => {
  test("Get should return providers array copy", async () => { // TODO: toBeClone
    const mock = cloneAndSetMockDbData(providersMock);
    const providers = await Providers.Get();
    expect(providers).not.toBe(mock.providers);
    expect(providers).toEqual(mock.providers);
  });

  test("GetByID should return provider copy with given ID", async () => {
    const mock = cloneAndSetMockDbData(providersMock);
    const provider = mock.providers[0];
    const providerClone = await Providers.GetByID(provider.id);
    expect(providerClone).not.toBe(provider);
    expect(providerClone).toEqual(provider);
  });

  test("Count should return actual providers count", async () => {
    const mock = cloneAndSetMockDbData(providersMock);
    const providersCountBeforeChange = await Providers.GetCount();
    expect(providersCountBeforeChange).toBe(mock.providers.length);
    const newProvider: IProvider = getProvider();
    const { id: newProviderID } = await Providers.Create(newProvider);
    const providersCountAfterCreate = await Providers.GetCount();
    expect(providersCountAfterCreate).toBe(mock.providers.length);
    await Providers.Delete(newProviderID);
    const providersCountAfterDelete = await Providers.GetCount();
    expect(providersCountAfterDelete).toBe(mock.providers.length);
  });

  test("Create should push provider clone to providers array and return provider ID", async () => {
    const mock = cloneAndSetMockDbData(providersMock);
    const newProvider: IProvider = getProvider();
    const { id: newProviderID } = await Providers.Create(newProvider);
    newProvider.id = newProviderID;
    const providerFromDb = mock.providers.find(
      (provider) => provider.id === newProviderID,
    );
    expect(providerFromDb).not.toBe(newProvider);
    expect(providerFromDb).toEqual(newProvider);
  });

  test("Save should save provider clone to providers array", async () => {
    const mock = cloneAndSetMockDbData(providersMock);
    const provider = await Providers.GetByID(0);
    provider.name = "New provider name";
    await Providers.Save(provider);
    const providerFromDb = mock.providers.find((p) => p.id === provider.id);
    expect(providerFromDb).not.toBe(provider);
    expect(providerFromDb).toEqual(provider);
  });

  test("Delete should delete provider from providers array", async () => {
    const mock = cloneAndSetMockDbData(providersMock);
    const deleteProviderID = 0;
    await Providers.Delete(deleteProviderID);
    const providerFindResult = mock.providers.find(
      (provider) => provider.id === deleteProviderID,
    );
    expect(providerFindResult).toBeUndefined();
  });
});
