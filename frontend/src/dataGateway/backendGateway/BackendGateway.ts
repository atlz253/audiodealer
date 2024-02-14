import axios from "axios";
import AbstractGateway from "../abstractGateway/AbstractGateway";
import { baseURL } from "./BackendGatewayConfig";
import BackendGatewayProducts from "./BackendGatewayProducts";
import Products from "../abstractGateway/Products";
import BackendGatewayContracts from "./BackendGatewayContracts";
import Contracts from "../abstractGateway/Contracts";
import BackendGatewayLogin from "./BackendGatewayLogin";
import Login from "../abstractGateway/Login";
import BackendGatewayDealerBills from "./BackendGatewayDealerBills";
import DealerBills from "../abstractGateway/DealerBills";
import BackendGatewayClients from "./BackendGatewayClients";
import Clients from "../abstractGateway/Clients";
import BackendGatewayUsers from "./BackendGatewayUsers";
import Users from "../abstractGateway/Users";
import BackendGatewayProviders from "./BackendGatewayProviders";
import Providers from "../abstractGateway/Providers";
import BackendGatewayQueries from "./BackendGatewayQueries";
import Queries from "../abstractGateway/Queries";

// TODO: encapsulate axios errors in this module
class BackendGateway extends AbstractGateway { // TODO: remove BackendGateway prefix
  public static get Products(): typeof Products {
    return BackendGatewayProducts;
  }

  public static get Contracts(): typeof Contracts {
    return BackendGatewayContracts;
  }

  public static get Login(): typeof Login {
    return BackendGatewayLogin;
  }

  public static get DealerBills(): typeof DealerBills {
    return BackendGatewayDealerBills;
  }

  public static get Clients(): typeof Clients {
    return BackendGatewayClients;
  }

  public static get Users(): typeof Users {
    return BackendGatewayUsers;
  }

  public static get Providers(): typeof Providers {
    return BackendGatewayProviders;
  }

  public static get Queries(): typeof Queries {
    return BackendGatewayQueries;
  }

  public static DownloadFile(url: string, fileName: string): void {
    axios({
      url: baseURL + url,
      method: "GET",
      responseType: "blob",
      headers: {
        authorization: this.authToken,
      },
    })
      .then((response) => {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");

        link.href = href;

        link.setAttribute("download", fileName);

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((reason) => alert("Не удалось получить файл"));
  }
}

export default BackendGateway;
