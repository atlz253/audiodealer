import AuthTokenKeeper from "./abstractGateway/AuthTokenKeeper";
import Clients from "./abstractGateway/Clients";
import Contracts from "./abstractGateway/Contracts";
import AbstractGateway from "./abstractGateway/AbstractGateway";
import DealerBills from "./abstractGateway/DealerBills";
import Login from "./abstractGateway/Login";
import Products from "./abstractGateway/Products";
import Providers from "./abstractGateway/Providers";
import Queries from "./abstractGateway/Queries";
import Users from "./abstractGateway/Users";
import Cheques from "./abstractGateway/Cheques";

class DataGateway extends AuthTokenKeeper {
  private static dataGatewayImplementation: typeof AbstractGateway = AbstractGateway;

  public static SetDataGatewayImplementation(
    implementation: typeof AbstractGateway,
  ) {
    this.dataGatewayImplementation = implementation;
    this.dataGatewayImplementation.SetAuthToken(this.authToken);
  }

  public static SetAuthToken(token: string): void {
    super.SetAuthToken(token);

    this.dataGatewayImplementation.SetAuthToken(token);
  }

  public static get Products(): typeof Products {
    return this.dataGatewayImplementation.Products;
  }

  public static get Contracts(): typeof Contracts {
    return this.dataGatewayImplementation.Contracts;
  }

  public static get Cheques(): typeof Cheques {
    return this.dataGatewayImplementation.Cheques;
  }

  public static get Login(): typeof Login {
    return this.dataGatewayImplementation.Login;
  }

  public static get DealerBills(): typeof DealerBills {
    return this.dataGatewayImplementation.DealerBills;
  }

  public static get Clients(): typeof Clients {
    return this.dataGatewayImplementation.Clients;
  }

  public static get Users(): typeof Users {
    return this.dataGatewayImplementation.Users;
  }

  public static get Providers(): typeof Providers {
    return this.dataGatewayImplementation.Providers;
  }

  public static get Queries(): typeof Queries {
    return this.dataGatewayImplementation.Queries;
  }

  public static DownloadFile(url: string, fileName: string): void {
    this.dataGatewayImplementation.DownloadFile(url, fileName);
  }
}

export default DataGateway;
