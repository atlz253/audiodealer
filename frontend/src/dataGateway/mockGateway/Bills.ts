import IBill from "../../../../common/interfaces/IBill";
import ID from "../../../../common/interfaces/ID";
import MockDb from "./MockDb/MockDb";
import { findMaxMockObjectID } from "./mockObjectID";

class Bills {
  public static async GetBillCloneByUserIDAndBillID(
    userID: number,
    billID: number,
  ): Promise<IBill> {
    const bill = await this.GetBillByUserIDAndBillID(userID, billID);
    const billClone = structuredClone(bill);
    return billClone;
  }

  private static async GetBillByUserIDAndBillID(
    userID: number,
    billID: number,
  ): Promise<IBill> {
    const userBills = await this.GetBillsByUserID(userID);
    const bill = userBills.find((bill) => bill.id === billID);
    if (bill) {
      return bill;
    } else {
      throw new Error(`Bill with ID ${billID} not found`);
    }
  }

  public static async Create(userID: number, bill: IBill): Promise<ID> {
    const userBills = await this.GetBillsByUserID(userID);
    const id = this.GetNextBillID();
    const billClone = structuredClone(bill);
    billClone.id = id;
    userBills.push(billClone);
    return { id };
  }

  public static CreateBillStorageForUserWithID(id: number) {
    if (this.IsUserHaveBillStorage(id)) {
      throw new Error(`Bill storage for user with ID ${id} already created`);
    }

    MockDb.Bills[id] = [];
  }

  public static IsUserHaveBillStorage(userID: number) {
    return MockDb.Bills[userID] !== undefined;
  }

  private static GetNextBillID(): number {
    const maxID = MockDb.Bills.reduce((maxID, bills) => {
      const maxProviderBillsID = findMaxMockObjectID(bills);
      return maxProviderBillsID > maxID ? maxProviderBillsID : maxID;
    }, 0);
    return maxID + 1;
  }

  public static async Save(userID: number, bill: IBill) {
    const billClone = structuredClone(bill);
    const userBills = await this.GetBillsByUserID(userID);
    const billIndex = await this.GetBillIndex(userID, bill.id);
    userBills[billIndex] = billClone;
  }

  public static async Delete(userID: number, billID: number) {
    const userBills = await this.GetBillsByUserID(userID);
    const billIndex = await this.GetBillIndex(userID, billID);
    userBills.splice(billIndex, 1);
  }

  private static async GetBillIndex(
    userID: number,
    billID: number,
  ): Promise<number> {
    const userBills = await this.GetBillsByUserID(userID);
    const billIndex = userBills.findIndex((b) => b.id === billID);

    if (billIndex === -1) {
      throw new Error(
        `Bill with ID ${billID} not found for user with ID ${userID}`,
      );
    } else {
      return billIndex;
    }
  }

  public static async GetBillsCloneByUserID(userID: number): Promise<IBill[]> {
    const bills = await this.GetBillsByUserID(userID);
    return structuredClone(bills);
  }

  private static async GetBillsByUserID(userID: number): Promise<IBill[]> {
    const userBills = MockDb.Bills[userID];

    if (userBills) {
      return userBills;
    } else {
      throw new Error(`Bills for user with ID ${userID} not found`);
    }
  }
}

export default Bills;
