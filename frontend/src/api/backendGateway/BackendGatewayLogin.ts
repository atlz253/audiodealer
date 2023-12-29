import axios from "axios";
import Login from "../abstractGateway/Login";
import IAuthorization from "../../../../common/interfaces/IAuthorization";
import IAuth from "../../../../common/interfaces/IAuth";
import { baseURL } from "./BackendGatewayConfig";

class BackendGatewayLogin extends Login {
  public static async Login(authorization: IAuthorization): Promise<IAuth> {
    const auth = await axios.post<IAuth>(baseURL + "/login", authorization);

    return auth.data;
  }
}

export default BackendGatewayLogin;