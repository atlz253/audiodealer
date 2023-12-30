import IBaseBill from "../../../../common/interfaces/IBaseBill";
import IBill from "../../../../common/interfaces/IBill";
import IBillNumber from "../../../../common/interfaces/IBillNumber";
import ID from "../../../../common/interfaces/ID";
import AuthTokenKeeper from "./AuthTokenKeeper";

class ProviderBills extends AuthTokenKeeper {
  public static async Get(
    providerID: number,
    onlyBillNumbers?: boolean,
  ): Promise<IBaseBill[] | IBillNumber[]> {
    throw new Error("Not implemented");
  }

  public static async GetByID(
    providerID: number,
    billID: number,
  ): Promise<IBill> {
    throw new Error("Not implemented");
  }

  public static async Create(providerID: number, bill: IBill): Promise<ID> {
    throw new Error("Not implemented");
  }

  public static async Delete(
    providerID: number,
    billID: number,
  ): Promise<void> {
    throw new Error("Not implemented");
  }

  public static async Save(providerID: number, bill: IBill): Promise<void> {
    throw new Error("Not implemented");
  }
}

export default ProviderBills;
