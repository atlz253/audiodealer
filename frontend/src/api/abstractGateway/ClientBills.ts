import IBill from "../../../../common/interfaces/IBill";
import AuthTokenKeeper from "./AuthTokenKeeper";
import ID from "../../../../common/interfaces/ID";
import IBaseBill from "../../../../common/interfaces/IBaseBill";
import IBillNumber from "../../../../common/interfaces/IBillNumber";

class ClientBills extends AuthTokenKeeper {
  public static async Get(
    clientID: number,
    onlyBillNumbers?: boolean,
  ): Promise<IBaseBill[] | IBillNumber[]> {
    throw new Error("Not implemented");
  }

  public static async GetByID(
    clientID: number,
    billID: number,
  ): Promise<IBill> {
    throw new Error("Not implemented");
  }

  public static async Create(clientID: number, bill: IBill): Promise<ID> {
    throw new Error("Not implemented");
  }

  public static async Delete(clientID: number, billID: number): Promise<void> {
    throw new Error("Not implemented");
  }

  public static async Save(clientID: number, bill: IBill): Promise<void> {
    throw new Error("Not implemented");
  }
}

export default ClientBills;
