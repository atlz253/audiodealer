import ProviderBills from "../abstractGateway/ProviderBills";
import { providerBills } from "./mocks/providerBills";
import IBill from "../../../../common/interfaces/IBill";
import { getMaxMockID } from "./mockID";
import { providers } from "./mocks/providers";

class MockGatewayProviderBills extends ProviderBills {
  public static async Get(providerID: number, onlyBillNumbers?: boolean) {
    return structuredClone(providerBills[providerID]) || [];
  }

  public static async GetByID(providerID: number, billID: number) {
    const bills = providerBills[providerID];
    const bill = bills.find((bill) => bill.id === billID);
    if (bill) {
      return bill;
    }
    throw new Error(`Bill with ID ${billID} not found`);
  }

  public static async Create(providerID: number, bill: IBill) {
    if (!providerBills[providerID]) {
      providerBills[providerID] = [];
    }
    bill.id = this.GetNextBillID();
    const billClone = structuredClone(bill);
    billClone.ownerName = this.GetProviderNameByProviderID(providerID);
    providerBills[providerID].push(billClone);
    return bill;
  }

  private static GetProviderNameByProviderID(providerID: number) {
    const provider = providers.find((provider) => provider.id === providerID);

    if (provider) {
      return provider.name;
    }

    throw new Error(`Provider with ID ${providerID} not found`);
  }

  private static GetNextBillID(): number {
    const maxID = providerBills.reduce((maxID, bills) => {
      const maxProviderBillsID = getMaxMockID(bills);
      return maxProviderBillsID > maxID ? maxProviderBillsID : maxID;
    }, 0);
    return maxID + 1;
  }

  public static async Delete(providerID: number, billID: number) {
    const billIndex = this.TryGetProviderBillIndex(providerID, billID);
    providerBills[providerID].splice(billIndex, 1);
  }

  public static async Save(providerID: number, bill: IBill) {
    const billIndex = this.TryGetProviderBillIndex(providerID, bill.id);
    providerBills[providerID][billIndex] = structuredClone(bill);
  }

  private static TryGetProviderBillIndex(
    providerID: number,
    billID: number,
  ): number {
    const certainProviderBills = this.TryGetCertainProviderBill(providerID);
    const billIndex = certainProviderBills.findIndex(
      (bill) => bill.id === billID,
    );

    if (billIndex === -1) {
      throw new Error(
        `Bill with ID ${billID} not found for provider with ID ${providerID}`,
      );
    } else {
      return billIndex;
    }
  }

  private static TryGetCertainProviderBill(providerID: number) {
    const bills = providerBills[providerID];

    if (bills) {
      return bills;
    } else {
      throw new Error(`Bills for provider with ID ${providerID} not found`);
    }
  }
}

export default MockGatewayProviderBills;
