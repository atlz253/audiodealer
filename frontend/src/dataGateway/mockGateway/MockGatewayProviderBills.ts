import ProviderBills from "../abstractGateway/ProviderBills";
import IBill from "../../../../common/interfaces/IBill";
import { bills } from "./mocks/bills";
import MockGatewayBills from "./MockGatewayBills";

class MockGatewayProviderBills extends ProviderBills {
  public static async Get(providerID: number, onlyBillNumbers?: boolean) {
    return structuredClone(bills[providerID]) || [];
  }

  public static async GetByID(providerID: number, billID: number) {
    const bill = MockGatewayBills.TryGetBillByUserIDAndBillID(
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
