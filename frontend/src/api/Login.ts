import axios from "axios";
import { baseURL } from "./APIconfig";
import IAuth from "../../../common/interfaces/IAuth";
import AbstractAPI from "./AbstractAPI";
import IAuthorization from "../../../common/interfaces/IAuthorization";

class Login extends AbstractAPI {
  public static async Login(authorization: IAuthorization): Promise<IAuth> {
    const auth = await axios.post<IAuth>(baseURL + "/login", authorization);

    return auth.data;
  }
}

export default Login;
