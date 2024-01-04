import IBaseBill from "../../../../common/interfaces/IBaseBill";
import AuthTokenKeeper from "./AuthTokenKeeper";
import IBill from "../../../../common/interfaces/IBill";
import ID from "../../../../common/interfaces/ID";
import IBillNumber from "../../../../common/interfaces/IBillNumber";

class DealerBills extends AuthTokenKeeper {
  public static async Get(
    onlyBillNumbers?: boolean,
  ): Promise<IBaseBill[] | IBillNumber[]> {
    throw new Error("Not implemented");
  }

  public static async GetByID(id: number): Promise<IBill> {
    throw new Error("Not implemented");
  }

  public static async Create(bill: IBill): Promise<ID> {
    throw new Error("Not implemented");
  }

  public static async Save(bill: IBill): Promise<void> {
    throw new Error("Not implemented");
  }

  public static async Delete(id: number): Promise<void> {
    throw new Error("Not implemented");
  }
}

export default DealerBills;
