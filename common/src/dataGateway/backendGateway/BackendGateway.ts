import axios from "axios";
import AbstractGateway from "../abstractGateway/AbstractGateway";
import { baseURL } from "./BackendGatewayConfig";
import BackendGatewayProducts from "./BackendGatewayProducts";
import BackendGatewayContracts from "./BackendGatewayContracts";
import BackendGatewayLogin from "./BackendGatewayLogin";
import BackendGatewayDealerBills from "./BackendGatewayDealerBills";
import BackendGatewayClients from "./BackendGatewayClients";
import BackendGatewayUsers from "./BackendGatewayUsers";
import BackendGatewayProviders from "./BackendGatewayProviders";
import BackendGatewayQueries from "./BackendGatewayQueries";

// TODO: encapsulate axios errors in this module
class BackendGateway extends AbstractGateway {
  // TODO: remove BackendGateway prefix
  public static get Products() {
    return BackendGatewayProducts;
  }

  public static get Contracts() {
    return BackendGatewayContracts;
  }

  public static get Login() {
    return BackendGatewayLogin;
  }

  public static get DealerBills() {
    return BackendGatewayDealerBills;
  }

  public static get Clients() {
    return BackendGatewayClients;
  }

  public static get Users() {
    return BackendGatewayUsers;
  }

  public static get Providers() {
    return BackendGatewayProviders;
  }

  public static get Queries() {
    return BackendGatewayQueries;
  }

  public static DownloadFile(url: string, fileName: string) {
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
