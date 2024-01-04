import IBill from "../../../../common/interfaces/IBill";
import ID from "../../../../common/interfaces/ID";
import { getMaxMockID } from "./mockID";
import { bills } from "./mocks/bills";

class MockGatewayBills {
  public static TryGetBillByUserIDAndBillID(
    userID: number,
    billID: number,
  ): IBill {
    const userBills = this.TryGetBillsByUserID(userID);
    const bill = userBills.find((bill) => bill.id === billID);
    if (bill) {
      return bill;
    } else {
      throw new Error(`Bill with ID ${billID} not found`);
    }
  }

  public static Create(userID: number, bill: IBill): ID {
    const userBills = this.GetOrCreateBillsWithUserID(userID);
    const id = this.GetNextBillID();
    const billClone = structuredClone(bill);
    billClone.id = id;
    userBills.push(billClone);
    return { id };
  }

  private static GetNextBillID(): number {
    const maxID = bills.reduce((maxID, bills) => {
      const maxProviderBillsID = getMaxMockID(bills);
      return maxProviderBillsID > maxID ? maxProviderBillsID : maxID;
    }, 0);
    return maxID + 1;
  }

  private static GetOrCreateBillsWithUserID(userID: number): IBill[] {
    try {
      return this.TryGetBillsByUserID(userID);
    } catch (e) {}

    const userBills: IBill[] = [];
    bills[userID] = userBills;
    return userBills;
  }

  public static Save(userID: number, bill: IBill) {
    const billClone = structuredClone(bill);
    const userBills = this.TryGetBillsByUserID(userID);
    const billIndex = this.TryGetBillIndex(userID, bill.id);
    userBills[billIndex] = billClone;
  }

  public static Delete(userID: number, billID: number) {
    const userBills = this.TryGetBillsByUserID(userID);
    const billIndex = this.TryGetBillIndex(userID, billID);
    userBills.splice(billIndex, 1);
  }

  private static TryGetBillIndex(userID: number, billID: number): number {
    const userBills = this.TryGetBillsByUserID(userID);
    const billIndex = userBills.findIndex((b) => b.id === billID);

    if (billIndex === -1) {
      throw new Error(
        `Bill with ID ${billID} not found for user with ID ${userID}`,
      );
    } else {
      return billIndex;
    }
  }

  public static TryGetBillsByUserID(userID: number): IBill[] {
    const userBills = bills[userID];

    if (userBills) {
      return userBills;
    } else {
      throw new Error(`Bills for user with ID ${userID} not found`);
    }
  }
}

export default MockGatewayBills;
