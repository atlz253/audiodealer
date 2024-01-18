import IAuth from "../../../../common/interfaces/IAuth";
import IAuthorization from "../../../../common/interfaces/IAuthorization";
import Login from "../abstractGateway/Login";
import MockDb from "./MockDb/MockDb";

class MockGatewayLogin extends Login {
  public static async Login(authorization: IAuthorization): Promise<IAuth> {
    const user = MockDb.Users.find(
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
