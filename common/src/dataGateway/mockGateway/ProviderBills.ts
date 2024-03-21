import {default as AbstractProviderBills} from "../abstractGateway/ProviderBills";
import IBill from "../../../interfaces/IBill";
import Bills from "./Bills";

class ProviderBills extends AbstractProviderBills {
  public static async Get(providerID: number, onlyBillNumbers?: boolean) {
    const bills = Bills.GetBillsCloneByUserID(providerID);
    return bills;
  }

  public static async GetByID(providerID: number, billID: number) {
    const bill = Bills.GetBillCloneByUserIDAndBillID(
      providerID,
      billID,
    );
    return bill;
  }

  public static async Create(providerID: number, bill: IBill) {
    const id = Bills.Create(providerID, bill);
    return id;
  }

  public static async Delete(providerID: number, billID: number) {
    Bills.Delete(providerID, billID);
  }

  public static async Save(providerID: number, bill: IBill) {
    Bills.Save(providerID, bill);
  }
}

export default ProviderBills;
