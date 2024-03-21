import IAuth from "../../../../common/interfaces/IAuth";
import AuthTokenKeeper from "./AuthTokenKeeper";
import IAuthorization from "../../../../common/interfaces/IAuthorization";
import { default as errorMessages } from "../errors/DataGatewayErrorMessages";
import DataGatewayError from "../errors/DataGatewayError";


class Login extends AuthTokenKeeper {
  public static async Login(authorization: IAuthorization): Promise<IAuth> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Login.name,
      ),
    );
  }
}

export default Login;
