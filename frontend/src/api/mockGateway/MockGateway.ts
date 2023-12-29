import AbstractGateway from "../abstractGateway/AbstractGateway";
import Login from "../abstractGateway/Login";
import Users from "../abstractGateway/Users";
import MockGatewayLogin from "./MockGatewayLogin";
import MockGatewayUsers from "./MockGatewayUsers";

class MockGateway extends AbstractGateway {
  public static get Login(): typeof Login {
    return MockGatewayLogin;
  }

  public static get Users(): typeof Users {
    return MockGatewayUsers;
  }
}

export default MockGateway;
