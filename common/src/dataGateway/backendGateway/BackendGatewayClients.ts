import axios from "axios";
import IBaseClient from "../../../interfaces/IBaseClient";
import IName from "../../../interfaces/IName";
import Clients from "../abstractGateway/Clients";
import { baseURL } from "./BackendGatewayConfig";
import IClient from "../../../interfaces/IClient";
import ICount from "../../../interfaces/ICount";
import ID from "../../../interfaces/ID";
import BackendGatewayClientBills from "./BackendGatewayClientBills";
import ClientBills from "../abstractGateway/ClientBills";

class BackendGatewayClients extends Clients {
  public static get Bills(): typeof ClientBills {
    return BackendGatewayClientBills;
  }

  public static async Get(
    onlyNames?: boolean,
  ): Promise<IBaseClient[] | IName[]> {
    const response = await axios.get<IBaseClient[] | IName[]>(
      baseURL + "/clients",
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

  public static async GetByID(id: number): Promise<IClient> {
    const response = await axios.get<IClient>(baseURL + "/clients/" + id, {
      headers: {
        authorization: this.authToken,
      },
    });

    return response.data;
  }

  public static async GetCount(): Promise<number> {
    const request = await axios.get<ICount>(baseURL + "/clients/count", {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data.count;
  }

  public static async Create(client: IClient): Promise<ID> {
    const response = await axios.post<ID>(baseURL + "/clients/new", client, {
      headers: {
        authorization: this.authToken,
      },
    });

    return response.data;
  }

  public static async Save(client: IClient): Promise<void> {
    await axios.put(baseURL + "/clients/" + client.id, client, {
      headers: {
        authorization: this.authToken,
      },
    });
  }

  public static async Delete(id: number): Promise<void> {
    await axios.delete(baseURL + "/clients/" + id, {
      headers: {
        authorization: this.authToken,
      },
    });
  }
}

export default BackendGatewayClients;
