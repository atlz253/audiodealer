import IBaseProduct from "../../../../common/interfaces/IBaseProduct";
import AuthTokenKeeper from "./AuthTokenKeeper";
import IDeliveryDays from "../../../../common/interfaces/IDeliveryDays";
import { default as errorMessages } from "../errors/DataGatewayErrorMessages";
import DataGatewayError from "../errors/DataGatewayError";

class ProviderProducts extends AuthTokenKeeper {
  public static async Get(providerID: number): Promise<IBaseProduct[]> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Get.name,
      ),
    );
  }

  public static async Add(
    providerID: number,
    productID: number,
    deliveryDays: IDeliveryDays,
  ): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Add.name,
      ),
    );
  }

  public static async Delete(
    providerID: number,
    productID: number,
  ): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Delete.name,
      ),
    );
  }
}

export default ProviderProducts;
