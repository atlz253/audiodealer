import MockDb from "./MockDb/MockDb";
import IAuth from "../../../../common/interfaces/IAuth";
import IAuthorization from "../../../../common/interfaces/IAuthorization";
import { default as AbstractLogin } from "../abstractGateway/Login";
import { default as errorMessages } from "../errors/LoginErrorsMessages";
import DataGatewayError from "../errors/DataGatewayError";
import objectToArray from "../../utils/objectToArray";

class Login extends AbstractLogin {
  public static async Login(authorization: IAuthorization): Promise<IAuth> {
    const user = objectToArray(MockDb.Users).find(
      (user) =>
        user.login === authorization.login &&
        user.password === authorization.password,
    );

    if (user) {
      return {
        accessToken: user.id.toString(),
        login: user.login || "",
        type: user.type,
      };
    }

    throw new DataGatewayError(errorMessages.getLoginFailedMessage());
  }
}

export default Login;
