import IBill from "../../../interfaces/IBill";
import {default as AbstractDealerBills} from "../abstractGateway/DealerBills";
import Bills from "./Bills";

class DealerBills extends AbstractDealerBills {
  public static async Get(onlyBillNumbers?: boolean) {
    const currentUserID = this.GetCurrentUserID();
    const currentUserBills =
      Bills.GetBillsCloneByUserID(currentUserID);
    return currentUserBills;
  }

  public static async GetByID(id: number) {
    const currentUserID = this.GetCurrentUserID();
    const bill = Bills.GetBillCloneByUserIDAndBillID(
      currentUserID,
      id,
    );
    return bill;
  }

  public static async Create(bill: IBill) {
    const currentUserID = this.GetCurrentUserID();
    const id = Bills.Create(currentUserID, bill);
    return id;
  }

  public static async Save(bill: IBill) {
    const currentUserID = this.GetCurrentUserID();
    Bills.Save(currentUserID, bill);
  }

  public static async Delete(id: number) {
    const currentUserID = this.GetCurrentUserID();
    Bills.Delete(currentUserID, id);
  }

  private static GetCurrentUserID(): number {
    const currentUserID = Number(this.authToken);
    return currentUserID;
  }
}

export default DealerBills;
