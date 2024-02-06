import IBill from "../../../../common/interfaces/IBill";
import Bills from "../../../src/dataGateway/mockGateway/Bills";
import { cloneAndSetMockDbData } from "./cloneAndSetMockDbData";
import { billsMock, getBill } from "./mocks/billsMocks";

describe("Mock data gateway bills", () => {
  // TODO: toBeClone
  test("GetBillCloneByUserIDAndBillID should return bill clone with given userID and billID", async () => {
    const mock = cloneAndSetMockDbData(billsMock);
    const userID = 0;
    const billID = 0;
    const bill = await Bills.GetBillCloneByUserIDAndBillID(userID, billID);
    const billFromDb = mock.bills[userID].find((bill) => bill.id === billID);
    expect(bill).not.toBe(billFromDb);
    expect(bill).toEqual(billFromDb);
  });

  test("GetBillCloneByUserIDAndBillID should throw error if user not exists", async () => {
    cloneAndSetMockDbData(billsMock);
    const notExistsUserID = 999;
    const billID = 0;
    await expect(
      Bills.GetBillCloneByUserIDAndBillID(notExistsUserID, billID),
    ).rejects.toThrow(`Bills for user with ID ${notExistsUserID} not found`);
  });

  test("GetBillCloneByUserIDAndBillID should throw error if bill not exists", async () => {
    cloneAndSetMockDbData(billsMock);
    const userID = 0;
    const notExistsBillID = 999;
    await expect(
      Bills.GetBillCloneByUserIDAndBillID(userID, notExistsBillID),
    ).rejects.toThrow(`Bill with ID ${notExistsBillID} not found`);
  });

  test("Create should add bill clone to user bills array with given userID and billID", async () => {
    const userID = 0;
    const newBill = getBill();
    const mock = cloneAndSetMockDbData(billsMock);
    const { id: newBillID } = await Bills.Create(userID, newBill);
    newBill.id = newBillID;
    const billFromDb = mock.bills[userID].find((bill) => bill.id === newBillID);
    expect(billFromDb).not.toBe(newBill);
    expect(billFromDb).toEqual(newBill);
  });

  test("Create should throw error if user not exists", async () => {
    const notExistsUserID = 999;
    const newBill: IBill = getBill();
    cloneAndSetMockDbData(billsMock);
    await expect(Bills.Create(notExistsUserID, newBill)).rejects.toThrow(
      `Bills for user with ID ${notExistsUserID} not found`,
    );
  });

  test("CreateBillStorage should create bill storage for user with given ID", async () => {
    const notExistsUserID = 999;
    cloneAndSetMockDbData(billsMock);
    await expect(Bills.GetBillsCloneByUserID(notExistsUserID)).rejects.toThrow(
      `Bills for user with ID ${notExistsUserID} not found`,
    );
    Bills.CreateBillStorageForUserWithID(notExistsUserID);
    await expect(Bills.GetBillsCloneByUserID(notExistsUserID)).resolves.toEqual(
      [],
    );
  });

  test("CreateBillStorage should throw error if bill storage already exists for user with given ID", () => {
    const userID = 0;
    cloneAndSetMockDbData(billsMock);
    expect(() => Bills.CreateBillStorageForUserWithID(userID)).toThrow(
      `Bill storage for user with ID ${userID} already created`,
    );
  });

  test("Save should save bill clone to user bills array with given userID and billID", async () => {
    const userID = 0;
    const billID = 0;
    const mock = cloneAndSetMockDbData(billsMock);
    const bill = await Bills.GetBillCloneByUserIDAndBillID(userID, billID);
    bill.billNumber = "50779872200000009999";
    await Bills.Save(userID, bill);
    const savedBillFromDb = mock.bills[userID].find(
      (bill) => bill.id === billID,
    );
    expect(savedBillFromDb).not.toBe(bill);
    expect(savedBillFromDb).toEqual(bill);
  });

  test("Save should throw error if user not exists", async () => {
    cloneAndSetMockDbData(billsMock);
    const notExistsUserID = 999;
    const bill = getBill();
    await expect(Bills.Save(notExistsUserID, bill)).rejects.toThrow(
      `Bills for user with ID ${notExistsUserID} not found`,
    );
  });

  test("Save should throw error if bill not exists for user with given userID", async () => {
    cloneAndSetMockDbData(billsMock);
    const userID = 0;
    const bill = getBill();
    bill.id = 999;
    await expect(Bills.Save(userID, bill)).rejects.toThrow(
      `Bill with ID ${bill.id} not found for user with ID ${userID}`,
    );
  });

  test("Delete should delete bill from user bills array with given userID", async () => {
    const userID = 0;
    const billID = 0;
    const mock = cloneAndSetMockDbData(billsMock);
    const bill = await Bills.GetBillCloneByUserIDAndBillID(userID, billID);
    await Bills.Delete(userID, billID);
    const findResult = mock.bills[userID].find((b) => b.id === bill.id);
    expect(findResult).toBeUndefined();
  });

  test("Delete should throw error if user not exists", async () => {
    const notExistsUserID = 999;
    const billID = 0;
    cloneAndSetMockDbData(billsMock);
    await expect(Bills.Delete(notExistsUserID, billID)).rejects.toThrow(
      `Bills for user with ID ${notExistsUserID} not found`,
    );
  });

  test("Delete should throw error if bill not exists", async () => {
    const userID = 0;
    const notExistsBillID = 999;
    cloneAndSetMockDbData(billsMock);
    await expect(Bills.Delete(userID, notExistsBillID)).rejects.toThrow(
      `Bill with ID ${notExistsBillID} not found for user with ID ${userID}`,
    );
  });

  test("GetBillsByUserID should return user bills array clone", async () => {
    const userID = 0;
    const mock = cloneAndSetMockDbData(billsMock);
    const bills = await Bills.GetBillsCloneByUserID(userID);
    const billsFromDb = mock.bills[userID];
    expect(bills).not.toBe(billsFromDb);
    expect(bills).toEqual(billsFromDb);
  });

  test("GetBillsByUserID should throw error if user not exists", async () => {
    const notExistsUserID = 999;
    cloneAndSetMockDbData(billsMock);
    await expect(Bills.GetBillsCloneByUserID(notExistsUserID)).rejects.toThrow(
      `Bills for user with ID ${notExistsUserID} not found`,
    );
  });
});
