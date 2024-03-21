import axios from "axios";
import IBaseProvider from "../../../interfaces/IBaseProvider";
import IName from "../../../interfaces/IName";
import Providers from "../abstractGateway/Providers";
import { baseURL } from "./BackendGatewayConfig";
import IProvider from "../../../interfaces/IProvider";
import ICount from "../../../interfaces/ICount";
import ID from "../../../interfaces/ID";
import BackendGatewayProviderBills from "./BackendGatewayProviderBills";
import ProviderBills from "../abstractGateway/ProviderBills";
import BackendGatewayProviderProducts from "./BackendGatewayProviderProducts";
import ProviderProducts from "../abstractGateway/ProviderProducts";

class BackendGatewayProviders extends Providers {
  public static get Bills(): typeof ProviderBills {
    return BackendGatewayProviderBills;
  }

  public static get Products(): typeof ProviderProducts {
    return BackendGatewayProviderProducts;
  }

  public static async Get(
    onlyNames?: boolean,
  ): Promise<IBaseProvider[] | IName[]> {
    const response = await axios.get<IBaseProvider[] | IName[]>(
      baseURL + "/providers",
      {
        headers: {
          authorization: this.authToken,
        },
        params: {
          onlyNames,
        },
      },
    );

    return response.data;
  }

  public static async GetByID(providerID: number): Promise<IProvider> {
    const response = await axios.get<IProvider>(
      baseURL + "/providers/" + providerID,
      {
        headers: {
          authorization: this.authToken,
        },
      },
    );

    return response.data;
  }

  public static async GetCount(): Promise<number> {
    const request = await axios.get<ICount>(baseURL + "/providers/count", {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data.count;
  }

  public static async Create(provider: IProvider): Promise<ID> {
    const response = await axios.post<ID>(
      baseURL + "/providers/" + provider.id,
      provider,
      {
        headers: {
          authorization: this.authToken,
        },
      },
    );

    return response.data;
  }

  public static async Save(provider: IProvider): Promise<void> {
    await axios.put<ID>(baseURL + "/providers/" + provider.id, provider, {
      headers: {
        authorization: this.authToken,
      },
    });
  }

  public static async Delete(providerID: number): Promise<void> {
    await axios.delete<ID>(baseURL + "/providers/" + providerID, {
      headers: {
        authorization: this.authToken,
      },
    });
  }
}

export default BackendGatewayProviders;
