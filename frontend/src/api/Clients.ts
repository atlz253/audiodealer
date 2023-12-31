import IBaseClient from "../../../common/interfaces/IBaseClient";
import AbstractAPI from "./AbstractAPI";
import axios from "axios";
import { baseURL } from "./APIconfig";
import ID from "../../../common/interfaces/ID";
import IClient from "../../../common/interfaces/IClient";
import ClientBills from "./ClientBills";
import IName from "../../../common/interfaces/IName";
import ICount from "../../../common/interfaces/ICount";

class Clients extends AbstractAPI {
  public static SetAuthToken(token: string): void {
    super.SetAuthToken(token);

    ClientBills.SetAuthToken(token);
  }

  public static get Bills(): typeof ClientBills {
    return ClientBills;
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

export default Clients;
