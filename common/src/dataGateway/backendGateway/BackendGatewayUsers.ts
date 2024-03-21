import axios from "axios";
import IUser from "../../../interfaces/IUser";
import Users from "../abstractGateway/Users";
import { baseURL } from "./BackendGatewayConfig";
import ID from "../../../interfaces/ID";

class BackendGatewayUsers extends Users {
  public static async Get(): Promise<IUser[]> {
    const response = await axios.get<IUser[]>(baseURL + "/users", {
      headers: {
        authorization: this.authToken,
      },
    });

    return response.data;
  }

  public static async GetByID(id: number): Promise<IUser> {
    const response = await axios.get<IUser>(baseURL + "/users/" + id, {
      headers: {
        authorization: this.authToken,
      },
    });

    return response.data;
  }

  public static async Create(user: IUser): Promise<ID> {
    const response = await axios.post<ID>(baseURL + "/users/new", user, {
      headers: {
        authorization: this.authToken,
      },
    });

    return response.data;
  }

  public static async Save(user: IUser): Promise<void> {
    await axios.put(baseURL + "/users/" + user.id, user, {
      headers: {
        authorization: this.authToken,
      },
    });
  }

  public static async Delete(id: number): Promise<void> {
    await axios.delete(baseURL + "/users/" + id, {
      headers: {
        authorization: this.authToken,
      },
    });
  }
}

export default BackendGatewayUsers;