import IProvider from "../../../../common/interfaces/IProvider";
import { default as AbstractProviders } from "../abstractGateway/Providers";
import Bills from "./Bills";
import MockDb from "./MockDb/MockDb";
import ProviderBills from "./ProviderBills";
import ProviderProducts from "./ProviderProducts";
import { getNewMockBillUserID } from "./mockObjectID";
import { default as errorMessages } from "../errors/ProvidersErrorsMessages";
import DataGatewayError from "../errors/DataGatewayError";

class Providers extends AbstractProviders {
  public static get Bills() {
    return ProviderBills;
  }

  public static get Products() {
    return ProviderProducts;
  }

  public static async Get(onlyNames?: boolean) {
    return structuredClone(MockDb.Providers);
  }

  public static async GetByID(providerID: number) {
    if (this.IsProviderWithIDExist(providerID)) {
      return structuredClone(MockDb.Providers[providerID]);
    } else {
      throw new DataGatewayError(
        errorMessages.getProviderWithGivenIDNotFoundMessage(providerID),
      );
    }
  }

  public static async GetCount() {
    return MockDb.Providers.length;
  }

  public static async Create(provider: IProvider) {
    // TODO: input data check
    provider.id = getNewMockBillUserID();
    const providerClone = structuredClone(provider);
    MockDb.Providers.push(providerClone);
    Bills.CreateBillStorageForUserWithID(provider.id);
    return provider;
  }

  public static async Save(provider: IProvider) {
    const providerIndex = this.TryFindProviderIndexByID(provider.id);
    MockDb.Providers[providerIndex] = structuredClone(provider);
  }

  public static async Delete(providerID: number) {
    const providerIndex = this.TryFindProviderIndexByID(providerID);
    MockDb.Providers.splice(providerIndex, 1);
  }

  private static IsProviderWithIDExist(id: number) {
    return MockDb.Providers[id] !== undefined;
  }

  private static TryFindProviderIndexByID(id: number) {
    const providerIndex = MockDb.Providers.findIndex(
      (provider) => provider.id === id,
    );

    if (providerIndex === -1) {
      throw new DataGatewayError(
        errorMessages.getProviderWithGivenIDNotFoundMessage(id),
      );
    } else {
      return providerIndex;
    }
  }
}

export default Providers;
