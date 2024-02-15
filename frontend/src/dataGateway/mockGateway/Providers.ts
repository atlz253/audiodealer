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
    if (this.IsProviderWithIDExist(provider.id)) {
      MockDb.Providers[provider.id] = structuredClone(provider);
    } else {
      throw new DataGatewayError(
        errorMessages.getProviderWithGivenIDNotFoundMessage(provider.id),
      );
    }
  }

  public static async Delete(providerID: number) {
    if (this.IsProviderWithIDExist(providerID)) {
      delete MockDb.Providers[providerID];
    } else {
      throw new DataGatewayError(
        errorMessages.getProviderWithGivenIDNotFoundMessage(providerID),
      );
    }
  }

  private static IsProviderWithIDExist(id: number) {
    return MockDb.Providers[id] !== undefined;
  }
}

export default Providers;
