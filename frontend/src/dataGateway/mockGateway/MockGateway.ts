import AbstractGateway from "../abstractGateway/AbstractGateway";
import MockGatewayLogin from "./MockGatewayLogin";
import MockGatewayProviders from "./MockGatewayProviders";
import MockGatewayUsers from "./MockGatewayUsers";
import MockGatewayProducts from "./MockGatewayProducts";
import MockGatewayDealerBills from "./MockGatewayDealerBills";
import MockGatewayClients from "./MockGatewayClients";

class MockGateway extends AbstractGateway {
  public static get Products() {
    return MockGatewayProducts;
  }

  public static get Login() {
    return MockGatewayLogin;
  }

  public static get DealerBills() {
    return MockGatewayDealerBills;
  }

  public static get Clients() {
    return MockGatewayClients;
  }

  public static get Users() {
    return MockGatewayUsers;
  }

  public static get Providers() {
    return MockGatewayProviders;
  }
}

export default MockGateway;
