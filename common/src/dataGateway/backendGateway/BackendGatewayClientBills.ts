import axios from "axios";
import IBaseBill from "../../../interfaces/IBaseBill";
import IBillNumber from "../../../interfaces/IBillNumber";
import ClientBills from "../abstractGateway/ClientBills";
import { baseURL } from "./BackendGatewayConfig";
import IBill from "../../../interfaces/IBill";
import ID from "../../../interfaces/ID";

class BackendGatewayClientBills extends ClientBills {
  public static async Get(
    clientID: number,
    onlyBillNumbers?: boolean,
  ): Promise<IBaseBill[] | IBillNumber[]> {
    const request = await axios.get<IBaseBill[]>(
      baseURL + "/clients/" + clientID + "/bills",
      {
        headers: {
          authorization: this.authToken,
        },
        params: {
          onlyBillNumbers,
        },
      },
    );

    return request.data;
  }

  public static async GetByID(
    clientID: number,
    billID: number,
  ): Promise<IBill> {
    const request = await axios.get<IBill>(
      baseURL + "/clients/" + clientID + "/bills/" + billID,
      {
        headers: {
          authorization: this.authToken,
        },
      },
    );

    return request.data;
  }

  public static async Create(clientID: number, bill: IBill): Promise<ID> {
    const request = await axios.post<ID>(
      baseURL + "/clients/" + clientID + "/bills/new",
      bill,
      {
        headers: {
          authorization: this.authToken,
        },
      },
    );

    return request.data;
  }

  public static async Delete(clientID: number, billID: number): Promise<void> {
    await axios.delete(baseURL + "/clients/" + clientID + "/bills/" + billID, {
      headers: {
        authorization: this.authToken,
      },
    });
  }

  public static async Save(clientID: number, bill: IBill): Promise<void> {
    await axios.put(
      baseURL + "/clients/" + clientID + "/bills/" + bill.id,
      bill,
      {
        headers: {
          authorization: this.authToken,
        },
      },
    );
  }
}

export default BackendGatewayClientBills;
