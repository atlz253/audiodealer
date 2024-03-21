import AbstractGateway from "../abstractGateway/AbstractGateway";
import Login from "./Login";
import Providers from "./Providers";
import Users from "./Users";
import Products from "./Products";
import DealerBills from "./DealerBills";
import Clients from "./Clients";
import Contracts from "./Contracts";
import Cheques from "./Cheques";

class MockGateway extends AbstractGateway {
  public static get Products() {
    return Products;
  }

  public static get Contracts() {
    return Contracts;
  }

  public static get Cheques() {
    return Cheques;
  }

  public static get Login() {
    return Login;
  }

  public static get DealerBills() {
    return DealerBills;
  }

  public static get Clients() {
    return Clients;
  }

  public static get Users() {
    return Users;
  }

  public static get Providers() {
    return Providers;
  }
}

export default MockGateway;
