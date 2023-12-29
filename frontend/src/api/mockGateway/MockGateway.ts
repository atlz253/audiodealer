import AbstractGateway from "../abstractGateway/AbstractGateway";
import Login from "../abstractGateway/Login";
import MockGatewayLogin from "./MockGatewayLogin";

class MockGateway extends AbstractGateway {
  public static get Login(): typeof Login {
    return MockGatewayLogin;
  }
}

export default MockGateway;
