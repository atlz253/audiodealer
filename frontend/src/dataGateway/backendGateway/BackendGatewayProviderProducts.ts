import axios from "axios";
import IBaseProduct from "../../../../common/interfaces/IBaseProduct";
import ProviderProducts from "../abstractGateway/ProviderProducts";
import { baseURL } from "./BackendGatewayConfig";
import IDeliveryDays from "../../../../common/interfaces/IDeliveryDays";

class BackendGatewayProviderProducts extends ProviderProducts {
  public static async Get(providerID: number): Promise<IBaseProduct[]> {
    const request = await axios.get<IBaseProduct[]>(
      baseURL + "/providers/" + providerID + "/products",
      {
        headers: {
          authorization: this.authToken,
        },
      },
    );

    return request.data;
  }

  public static async Add(
    providerID: number,
    productID: number,
    deliveryDays: IDeliveryDays,
  ): Promise<void> {
    await axios.put(
      baseURL + "/providers/" + providerID + "/products/" + productID,
      deliveryDays,
      {
        headers: {
          authorization: this.authToken,
        },
      },
    );
  }

  public static async Delete(
    providerID: number,
    productID: number,
  ): Promise<void> {
    await axios.delete(
      baseURL + "/providers/" + providerID + "/products/" + productID,
      {
        headers: {
          authorization: this.authToken,
        },
      },
    );
  }
}

export default BackendGatewayProviderProducts;
