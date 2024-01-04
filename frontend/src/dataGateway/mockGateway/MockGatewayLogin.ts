import IAuth from "../../../../common/interfaces/IAuth";
import IAuthorization from "../../../../common/interfaces/IAuthorization";
import Login from "../abstractGateway/Login";
import { users } from "./mocks/users";

class MockGatewayLogin extends Login {
  public static async Login(authorization: IAuthorization): Promise<IAuth> {
    const user = users.find(
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

    throw new Error("Login failed");
  }
}

export default MockGatewayLogin;
