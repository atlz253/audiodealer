import IProvider from "../../../../common/interfaces/IProvider";
import Providers from "../abstractGateway/Providers";
import MockGatewayProviderBills from "./MockGatewayProviderBills";
import MockGatewayProviderProducts from "./MockGatewayProviderProducts";
import { getNextBillUserID } from "./mockID";
import { providers } from "./mocks/providers";

class MockGatewayProviders extends Providers {
  public static get Bills() {
    return MockGatewayProviderBills;
  }

  public static get Products() {
    return MockGatewayProviderProducts;
  }

  public static async Get(onlyNames?: boolean) {
    return structuredClone(providers);
  }

  public static async GetByID(providerID: number) {
    const provider = providers.find((provider) => provider.id === providerID);

    if (provider) {
      return structuredClone(provider);
    }

    throw new Error(`Provider with ID ${providerID} not found`);
  }

  public static async GetCount() {
    return providers.length;
  }

  public static async Create(provider: IProvider) {
    // TODO: input data check
    provider.id = getNextBillUserID();
    const providerClone = structuredClone(provider);
    providers.push(providerClone);
    return provider;
  }

  public static async Save(provider: IProvider) {
    const providerIndex = this.TryFindProviderIndexByID(provider.id);
    providers[providerIndex] = structuredClone(provider);
  }

  public static async Delete(providerID: number) {
    const providerIndex = this.TryFindProviderIndexByID(providerID);
    providers.splice(providerIndex, 1);
  }

  private static TryFindProviderIndexByID(id: number) {
    const providerIndex = providers.findIndex((provider) => provider.id === id);

    if (providerIndex === -1) {
      throw new Error(`Provider with ID ${id} not found`);
    } else {
      return providerIndex;
    }
  }
}

export default MockGatewayProviders;
