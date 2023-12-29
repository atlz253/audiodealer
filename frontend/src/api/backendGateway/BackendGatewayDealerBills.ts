import axios from "axios";
import IBaseBill from "../../../../common/interfaces/IBaseBill";
import IBillNumber from "../../../../common/interfaces/IBillNumber";
import DealerBills from "../abstractGateway/DealerBills";
import { baseURL } from "./BackendGatewayConfig";
import IBill from "../../../../common/interfaces/IBill";
import ID from "../../../../common/interfaces/ID";

class BackendGatewayDealerBills extends DealerBills {
  public static async Get(
    onlyBillNumbers?: boolean,
  ): Promise<IBaseBill[] | IBillNumber[]> {
    const request = await axios.get<IBaseBill[]>(baseURL + "/bills", {
      headers: {
        authorization: this.authToken,
      },
      params: {
        onlyBillNumbers,
      },
    });

    return request.data;
  }

  public static async GetByID(id: number): Promise<IBill> {
    const request = await axios.get<IBill>(baseURL + "/bills/" + id, {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data;
  }

  public static async Create(bill: IBill): Promise<ID> {
    const request = await axios.post<ID>(baseURL + "/bills/new", bill, {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data;
  }

  public static async Save(bill: IBill): Promise<void> {
    await axios.put<ID>(baseURL + "/bills/" + bill.id, bill, {
      headers: {
        authorization: this.authToken,
      },
    });
  }

  public static async Delete(id: number): Promise<void> {
    await axios.delete<ID>(baseURL + "/bills/" + id, {
      headers: {
        authorization: this.authToken,
      },
    });
  }
}

export default BackendGatewayDealerBills;
