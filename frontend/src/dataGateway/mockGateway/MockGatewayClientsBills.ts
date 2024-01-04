import IBill from "../../../../common/interfaces/IBill";
import ClientBills from "../abstractGateway/ClientBills";
import MockGatewayBills from "./MockGatewayBills";

class MockGatewayClientsBills extends ClientBills {
  public static async Get(clientID: number, onlyBillNumbers?: boolean) {
    const bills = MockGatewayBills.GetBillsByUserID(clientID);
    return bills;
  }

  public static async GetByID(clientID: number, billID: number) {
    const bill = MockGatewayBills.TryGetBillCloneByUserIDAndBillID(clientID, billID);
    return bill;
  }

  public static async Create(clientID: number, bill: IBill) {
    const id = MockGatewayBills.Create(clientID, bill);
    return id;
  }

  public static async Delete(clientID: number, billID: number) {
    MockGatewayBills.Delete(clientID, billID);
  }

  public static async Save(clientID: number, bill: IBill) {
    MockGatewayBills.Save(clientID, bill);
  }
}

export default MockGatewayClientsBills;
