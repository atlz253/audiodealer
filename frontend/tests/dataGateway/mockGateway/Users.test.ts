import IUser from "../../../../common/interfaces/IUser";
import MockDb from "../../../src/dataGateway/mockGateway/MockDb/MockDb";
import Users from "../../../src/dataGateway/mockGateway/Users";
import { cloneAndSetMockDbData } from "./cloneAndSetMockDbData";
import { adminAndDealerMock } from "./mocks/adminAndDealerMock";

describe("Mock data gateway users", () => {
  test("Get should return users array copy", async () => {
    const mockDb = cloneAndSetMockDbData(adminAndDealerMock);
    MockDb.SetMockDbData(mockDb);
    const users = await Users.Get();
    expect(users).toEqual(mockDb.users);
    expect(users).not.toBe(mockDb.users);
  });

  test("GetByID should return user copy with the given ID", async () => {
    const mockDb = cloneAndSetMockDbData(adminAndDealerMock);
    const expectedUser = mockDb.users[1];
    const user = await Users.GetByID(expectedUser.id);
    expect(user).toEqual(expectedUser);
    expect(user).not.toBe(expectedUser);
  });

  test("Create should push user clone to users array", async () => {
    const mockDb = cloneAndSetMockDbData(adminAndDealerMock);
    const newUser: IUser = {
      id: 0,
      type: "dealer",
      firstName: "Dealer",
    };
    const { id: newUserID } = await Users.Create(newUser);
    newUser.id = newUserID;
    const mockDbUser = mockDb.users.find((user) => user.id === newUserID);
    expect(mockDbUser).not.toBe(newUser);
    expect(mockDbUser).toEqual(newUser);
  });

  test("Save should save new user data", async () => {
    const mockDb = cloneAndSetMockDbData(adminAndDealerMock);
    const dealerUserID = 1;
    const dealerUser = await Users.GetByID(dealerUserID);
    dealerUser.firstName = "New dealer name";
    await Users.Save(dealerUser);
    const savedUser = mockDb.users.find((user) => user.id === dealerUserID);
    expect(savedUser).not.toBe(dealerUser);
    expect(savedUser).toEqual(dealerUser);
  });

  test("First admin delete should throw error", async () => {
    await expect(Users.Delete(0)).rejects.toThrow(
      "It's not allowed to delete the first admin",
    );
  });

  test("Delete should throw error if user not exists", async () => {
    const notExistsUserID = 999;
    await expect(Users.Delete(notExistsUserID)).rejects.toThrow(
      `User with ID ${notExistsUserID} not found in users array`,
    );
  });

  test("Delete should delete if user exists", async () => {
    const mockDb = cloneAndSetMockDbData(adminAndDealerMock);
    const dealerUserID = 1;
    await Users.Delete(dealerUserID);
    const userFindResult = mockDb.users.find(
      (user) => user.id === dealerUserID,
    );
    expect(userFindResult).toBeUndefined();
  });
});
