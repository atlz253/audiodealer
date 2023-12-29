import IAuth from "../../../../common/interfaces/IAuth";
import AuthTokenKeeper from "./AuthTokenKeeper";
import IAuthorization from "../../../../common/interfaces/IAuthorization";

class Login extends AuthTokenKeeper {
  public static async Login(authorization: IAuthorization): Promise<IAuth> {
    throw new Error("Not implemented");
  }
}

export default Login;
