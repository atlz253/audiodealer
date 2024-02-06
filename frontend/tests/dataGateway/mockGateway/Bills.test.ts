import IBill from "../../../../common/interfaces/IBill";
import Bills from "../../../src/dataGateway/mockGateway/Bills";
import MockDb from "../../../src/dataGateway/mockGateway/MockDb/MockDb";
import { default as mocks } from "./mocks/billsMocks";
import { default as errorMessages } from "../../../src/dataGateway/errors/BillsErrorsMessages";

describe("Mock data gateway bills", () => {
  beforeEach(() => {
    const { getBillsMock } = mocks;
    const mockDbData = getBillsMock();
    MockDb.SetMockDbData(mockDbData);
  });

  test("GetBillCloneByUserIDAndBillID should return bill clone with given userID and billID", async () => {
    const { userID, billID } = mocks.existBillMockInfo;
    const bill = await Bills.GetBillCloneByUserIDAndBillID(userID, billID);
    const billFromDb = MockDb.FindBillByOwnerIDAndBillID(userID, billID);
    expect(bill).toBeClone(billFromDb);
  });

  test("GetBillCloneByUserIDAndBillID should throw error if user not exists", async () => {
    const { userID, billID } = mocks.notExistUserBillMockInfo;
    const errorMessage =
      errorMessages.getBillsForUserWithGivenIDNotFoundMessage(userID);
    await expect(
      Bills.GetBillCloneByUserIDAndBillID(userID, billID),
    ).rejects.toThrow(errorMessage);
  });

  test("GetBillCloneByUserIDAndBillID should throw error if bill not exists", async () => {
    const { userID, billID } = mocks.notExistBillMockInfo;
    const errorMessage =
      errorMessages.getBillWithGivenIDNotFoundErrorMessage(billID);
    await expect(
      Bills.GetBillCloneByUserIDAndBillID(userID, billID),
    ).rejects.toThrow(errorMessage);
  });

  test("Create should add bill clone to user bills array with given userID and billID", async () => {
    const { existUserID, getBill } = mocks;
    const newBill = getBill();
    const { id: newBillID } = await Bills.Create(existUserID, newBill);
    newBill.id = newBillID;
    const billFromDb = MockDb.FindBillByOwnerIDAndBillID(
      existUserID,
      newBillID,
    );
    expect(billFromDb).toBeClone(newBill);
  });

  test("Create should throw error if user not exists", async () => {
    const { userID } = mocks.notExistUserBillMockInfo;
    const newBill: IBill = mocks.getBill();
    const errorMessage =
      errorMessages.getBillsForUserWithGivenIDNotFoundMessage(userID);
    await expect(Bills.Create(userID, newBill)).rejects.toThrow(errorMessage);
  });

  test("CreateBillStorage should create bill storage for user with given ID", async () => {
    const { userID } = mocks.notExistUserBillMockInfo;
    const errorMessage =
      errorMessages.getBillsForUserWithGivenIDNotFoundMessage(userID);
    await expect(Bills.GetBillsCloneByUserID(userID)).rejects.toThrow(
      errorMessage,
    );
    Bills.CreateBillStorageForUserWithID(userID);
    await expect(Bills.GetBillsCloneByUserID(userID)).resolves.toEqual([]);
  });

  test("CreateBillStorage should throw error if bill storage already exists for user with given ID", () => {
    const { userID } = mocks.existBillMockInfo;
    const errorMessage =
      errorMessages.getBillStorageForUserWithGivenIDAlreadyCreatedMessage(
        userID,
      );
    expect(() => Bills.CreateBillStorageForUserWithID(userID)).toThrow(
      errorMessage,
    );
  });

  test("Save should save bill clone to user bills array with given userID and billID", async () => {
    const {
      existBillMockInfo: { userID, billID },
      uniqueBillNumber,
    } = mocks;
    const bill = await Bills.GetBillCloneByUserIDAndBillID(userID, billID);
    bill.billNumber = uniqueBillNumber;
    await Bills.Save(userID, bill);
    const savedBillFromDb = MockDb.FindBillByOwnerIDAndBillID(userID, billID);
    expect(savedBillFromDb).toBeClone(bill);
  });

  test("Save should throw error if user not exists", async () => {
    const { userID } = mocks.notExistUserBillMockInfo;
    const bill = mocks.getBill();
    const errorMessage =
      errorMessages.getBillsForUserWithGivenIDNotFoundMessage(userID);
    await expect(Bills.Save(userID, bill)).rejects.toThrow(errorMessage);
  });

  test("Save should throw error if bill not exists for user with given userID", async () => {
    const { userID, billID } = mocks.notExistBillMockInfo;
    const bill = mocks.getBill();
    bill.id = billID;
    const errorMessage =
      errorMessages.getBillWithGivenIDNotFoundForUserWithGivenIDMessage(
        bill.id,
        userID,
      );
    await expect(Bills.Save(userID, bill)).rejects.toThrow(errorMessage);
  });

  test("Delete should delete bill from user bills array with given userID", async () => {
    const { userID, billID } = mocks.existBillMockInfo;
    const bill = MockDb.FindBillByOwnerIDAndBillID(userID, billID);
    expect(bill).not.toBeUndefined();
    await Bills.Delete(userID, billID);
    const findResult = MockDb.FindBillByOwnerIDAndBillID(userID, billID);
    expect(findResult).toBeUndefined();
  });

  test("Delete should throw error if user not exists", async () => {
    const { userID, billID } = mocks.notExistUserBillMockInfo;
    const errorMessage =
      errorMessages.getBillsForUserWithGivenIDNotFoundMessage(userID);
    await expect(Bills.Delete(userID, billID)).rejects.toThrow(errorMessage);
  });

  test("Delete should throw error if bill not exists", async () => {
    const { userID, billID } = mocks.notExistBillMockInfo;
    const errorMessage =
      errorMessages.getBillWithGivenIDNotFoundForUserWithGivenIDMessage(
        billID,
        userID,
      );
    await expect(Bills.Delete(userID, billID)).rejects.toThrow(errorMessage);
  });

  test("GetBillsByUserID should return user bills array clone", async () => {
    const { userID } = mocks.existBillMockInfo;
    const bills = await Bills.GetBillsCloneByUserID(userID);
    const billsFromDb = MockDb.Bills[userID];
    expect(bills).toBeClone(billsFromDb);
  });

  test("GetBillsByUserID should throw error if user not exists", async () => {
    const { userID } = mocks.notExistUserBillMockInfo;
    const errorMessage =
      errorMessages.getBillsForUserWithGivenIDNotFoundMessage(userID);
    await expect(Bills.GetBillsCloneByUserID(userID)).rejects.toThrow(
      errorMessage,
    );
  });
});
