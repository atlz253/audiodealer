import IBill from "../../../../common/interfaces/IBill";
import {default as AbstractClientBills} from "../abstractGateway/ClientBills";
import Bills from "./Bills";

class ClientsBills extends AbstractClientBills {
  public static async Get(clientID: number, onlyBillNumbers?: boolean) {
    const bills = Bills.GetBillsByUserID(clientID);
    return bills;
  }

  public static async GetByID(clientID: number, billID: number) {
    const bill = Bills.TryGetBillCloneByUserIDAndBillID(clientID, billID);
    return bill;
  }

  public static async Create(clientID: number, bill: IBill) {
    const id = Bills.Create(clientID, bill);
    return id;
  }

  public static async Delete(clientID: number, billID: number) {
    Bills.Delete(clientID, billID);
  }

  public static async Save(clientID: number, bill: IBill) {
    Bills.Save(clientID, bill);
  }
}

export default ClientsBills;
