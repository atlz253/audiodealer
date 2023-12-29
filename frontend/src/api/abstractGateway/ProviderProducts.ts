import IBaseProduct from "../../../../common/interfaces/IBaseProduct";
import AuthTokenKeeper from "./AuthTokenKeeper";
import IDeliveryDays from "../../../../common/interfaces/IDeliveryDays";

class ProviderProducts extends AuthTokenKeeper {
  public static async Get(providerID: number): Promise<IBaseProduct[]> {
    throw new Error("Not implemented");
  }

  public static async Add(
    providerID: number,
    productID: number,
    deliveryDays: IDeliveryDays,
  ): Promise<void> {
    throw new Error("Not implemented");
  }

  public static async Delete(
    providerID: number,
    productID: number,
  ): Promise<void> {
    throw new Error("Not implemented");
  }
}

export default ProviderProducts;
