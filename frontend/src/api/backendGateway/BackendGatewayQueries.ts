import axios from "axios";
import IQueriesCategory from "../../../../common/interfaces/IQueriesCategory";
import Queries from "../abstractGateway/Queries";
import { baseURL } from "./BackendGatewayConfig";

class BackendGatewayQueries extends Queries {
  public static async Get(): Promise<IQueriesCategory[]> {
    const request = await axios.get<IQueriesCategory[]>(baseURL + "/queries", {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data;
  }
}

export default BackendGatewayQueries;
