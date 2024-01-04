import ProviderBills from "../abstractGateway/ProviderBills";
import IBill from "../../../../common/interfaces/IBill";
import MockGatewayBills from "./MockGatewayBills";

class MockGatewayProviderBills extends ProviderBills {
  public static async Get(providerID: number, onlyBillNumbers?: boolean) {
    const bills = MockGatewayBills.GetBillsByUserID(providerID);
    return bills;
  }

  public static async GetByID(providerID: number, billID: number) {
    const bill = MockGatewayBills.TryGetBillCloneByUserIDAndBillID(
      providerID,
      billID,
    );
    return bill;
  }

  public static async Create(providerID: number, bill: IBill) {
    const id = MockGatewayBills.Create(providerID, bill);
    return id;
  }

  public static async Delete(providerID: number, billID: number) {
    MockGatewayBills.Delete(providerID, billID);
  }

  public static async Save(providerID: number, bill: IBill) {
    MockGatewayBills.Save(providerID, bill);
  }
}

export default MockGatewayProviderBills;
