import IBill from "../../../../common/interfaces/IBill";
import DealerBills from "../abstractGateway/DealerBills";
import MockGatewayBills from "./MockGatewayBills";

class MockGatewayDealerBills extends DealerBills {
  public static async Get(onlyBillNumbers?: boolean) {
    const currentUserID = this.GetCurrentUserID();
    const currentUserBills =
      MockGatewayBills.GetBillsByUserID(currentUserID);
    return currentUserBills;
  }

  public static async GetByID(id: number) {
    const currentUserID = this.GetCurrentUserID();
    const bill = MockGatewayBills.TryGetBillCloneByUserIDAndBillID(
      currentUserID,
      id,
    );
    return bill;
  }

  public static async Create(bill: IBill) {
    const currentUserID = this.GetCurrentUserID();
    const id = MockGatewayBills.Create(currentUserID, bill);
    return id;
  }

  public static async Save(bill: IBill) {
    const currentUserID = this.GetCurrentUserID();
    MockGatewayBills.Save(currentUserID, bill);
  }

  public static async Delete(id: number) {
    const currentUserID = this.GetCurrentUserID();
    MockGatewayBills.Delete(currentUserID, id);
  }

  private static GetCurrentUserID(): number {
    const currentUserID = Number(this.authToken);
    return currentUserID;
  }
}

export default MockGatewayDealerBills;
