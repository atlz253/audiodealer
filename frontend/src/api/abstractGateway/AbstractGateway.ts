import AuthTokenKeeper from "./AuthTokenKeeper";
import Clients from "./Clients";
import Contracts from "./Contracts";
import DealerBills from "./DealerBills";
import Login from "./Login";
import Products from "./Products";
import Providers from "./Providers";
import Queries from "./Queries";
import Users from "./Users";

class AbstractGateway extends AuthTokenKeeper {
  public static SetAuthToken(token: string): void {
    super.SetAuthToken(token);

    DealerBills.SetAuthToken(token);
    Login.SetAuthToken(token);
    Users.SetAuthToken(token);
    Queries.SetAuthToken(token);
    Clients.SetAuthToken(token);
    Products.SetAuthToken(token);
    Providers.SetAuthToken(token);
    Contracts.SetAuthToken(token);
  }

  public static get Products(): typeof Products {
    return Products;
  }

  public static get Contracts(): typeof Contracts {
    return Contracts;
  }

  public static get Login(): typeof Login {
    return Login;
  }

  public static get DealerBills(): typeof DealerBills {
    return DealerBills;
  }

  public static get Clients(): typeof Clients {
    return Clients;
  }

  public static get Users(): typeof Users {
    return Users;
  }

  public static get Providers(): typeof Providers {
    return Providers;
  }

  public static get Queries(): typeof Queries {
    return Queries;
  }

  public static DownloadFile(url: string, fileName: string): void {
    throw new Error('Not implemented');
  }
}

export default AbstractGateway;