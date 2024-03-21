import axios from "axios";
import Cheques from "../abstractGateway/Cheques";
import { baseURL } from "./BackendGatewayConfig";
import ICheque from "../../../interfaces/ICheque";

class BackendGatewayCheques extends Cheques {
  public static async Save(contractID: number, cheque: ICheque): Promise<void> {
    await axios.put(
      baseURL + "/contracts/" + contractID + "/cheques/" + cheque.id,
      cheque,
      {
        headers: {
          authorization: this.authToken,
        },
      },
    );
  }
}

export default BackendGatewayCheques;
