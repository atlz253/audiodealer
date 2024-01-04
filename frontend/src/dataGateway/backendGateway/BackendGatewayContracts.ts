import axios from "axios";
import IBaseContract from "../../../../common/interfaces/IBaseContract";
import Contracts from "../abstractGateway/Contracts";
import { baseURL } from "./BackendGatewayConfig";
import IContract from "../../../../common/interfaces/IContract";
import ICount from "../../../../common/interfaces/ICount";
import INewContract from "../../../../common/interfaces/INewContract";
import ID from "../../../../common/interfaces/ID";
import BackendGatewayCheques from "./BackendGatewayCheques";
import Cheques from "../abstractGateway/Cheques";

class BackendGatewayContracts extends Contracts {
  public static get Cheques(): typeof Cheques {
    return BackendGatewayCheques;
  }

  public static async Get(): Promise<IBaseContract[]> {
    const request = await axios.get<IBaseContract[]>(baseURL + "/contracts", {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data;
  }

  public static async GetByID(id: number): Promise<IContract> {
    const request = await axios.get<IContract>(baseURL + "/contracts/" + id, {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data;
  }

  public static async GetCount(contractStatus?: string): Promise<number> {
    const request = await axios.get<ICount>(baseURL + "/contracts/count", {
      headers: {
        authorization: this.authToken,
      },
      params: {
        contractStatus,
      },
    });

    return request.data.count;
  }

  public static async Create(contract: INewContract): Promise<ID> {
    const request = await axios.post<ID>(baseURL + "/contracts/new", contract, {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data;
  }
}

export default BackendGatewayContracts;