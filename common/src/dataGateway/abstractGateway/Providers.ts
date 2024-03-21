import IBaseProvider from "../../../../common/interfaces/IBaseProvider";
import AuthTokenKeeper from "./AuthTokenKeeper";
import ProviderBills from "./ProviderBills";
import ProviderProducts from "./ProviderProducts";
import IName from "../../../../common/interfaces/IName";
import IProvider from "../../../../common/interfaces/IProvider";
import ID from "../../../../common/interfaces/ID";
import { default as errorMessages } from "../errors/DataGatewayErrorMessages";
import DataGatewayError from "../errors/DataGatewayError";

class Providers extends AuthTokenKeeper {
  public static SetAuthToken(token: string): void {
    super.SetAuthToken(token);

    this.Bills.SetAuthToken(token);
    this.Products.SetAuthToken(token);
  }

  public static get Bills(): typeof ProviderBills {
    return ProviderBills;
  }

  public static get Products(): typeof ProviderProducts {
    return ProviderProducts;
  }

  public static async Get(
    onlyNames?: boolean,
  ): Promise<IBaseProvider[] | IName[]> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Get.name,
      ),
    );
  }

  public static async GetByID(providerID: number): Promise<IProvider> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.GetByID.name,
      ),
    );
  }

  public static async GetCount(): Promise<number> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.GetCount.name,
      ),
    );
  }

  public static async Create(provider: IProvider): Promise<ID> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Create.name,
      ),
    );
  }

  public static async Save(provider: IProvider): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Save.name,
      ),
    );
  }

  public static async Delete(providerID: number): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Delete.name,
      ),
    );
  }
}

export default Providers;
