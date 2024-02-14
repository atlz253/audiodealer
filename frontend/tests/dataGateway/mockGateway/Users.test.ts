import IUser from "../../../../common/interfaces/IUser";
import MockDb from "../../../src/dataGateway/mockGateway/MockDb/MockDb";
import Users from "../../../src/dataGateway/mockGateway/Users";
import { default as mocks } from "./mocks/usersMocks";
import { default as errorMessages } from "../../../src/dataGateway/errors/UsersErrorsMessages";

// FIXME: remove password and login from User object?
describe("Mock data gateway users", () => {
  beforeEach(async () => {
    const mockDb = mocks.getAdminAndDealerMock();
    MockDb.SetMockDbData(mockDb);
  });

  test("Get should return users array copy", async () => {
    const users = await Users.Get();
    expect(users).toBeClone(MockDb.Users);
  });

  test("GetByID should return user copy with the given ID", async () => {
    const { existDealerID } = mocks;
    const user = await Users.GetByID(existDealerID);
    const userFromDb = MockDb.FindUserByID(existDealerID);
    expect(user).toBeClone(userFromDb);
  });

  test("GetByID should throw error if user not exists", async () => {
    const { notExistsUserID } = mocks;
    const errorMessage =
      errorMessages.getUserWithGivenIDNotFoundMessage(notExistsUserID);
    await expect(Users.GetByID(notExistsUserID)).rejects.toThrow(errorMessage);
  });

  test("Create should push user clone to users array", async () => {
    const { getUser } = mocks;
    const newUser: IUser = getUser();
    const { id: newUserID } = await Users.Create(newUser);
    newUser.id = newUserID;
    const userFromDb = MockDb.FindUserByID(newUserID);
    expect(newUser).toBeClone(userFromDb);
  });

  test("Save should save new user data", async () => {
    const { existDealerID } = mocks;
    const dealerUser = await Users.GetByID(existDealerID);
    dealerUser.firstName = "New dealer name";
    await Users.Save(dealerUser);
    const userFromDb = MockDb.FindUserByID(existDealerID);
    expect(dealerUser).toBeClone(userFromDb);
  });

  test("Save should throw error if user not exists", async () => {
    const { getUser } = mocks;
    const newUser = getUser();
    const errorMessage = errorMessages.getUserWithGivenIDNotFoundMessage(
      newUser.id,
    );
    await expect(Users.Save(newUser)).rejects.toThrow(errorMessage);
  });

  test("Delete should delete user from users array", async () => {
    const { existDealerID } = mocks;
    await Users.Delete(existDealerID);
    const userFindResult = MockDb.FindUserByID(existDealerID);
    expect(userFindResult).toBeUndefined();
  });

  test("Delete should throw error if first admin delete", async () => {
    const { firstAdminID } = mocks;
    const errorMessage = errorMessages.getFirstAdminDeleteNotAllowedMessage();
    await expect(Users.Delete(firstAdminID)).rejects.toThrow(errorMessage);
  });

  test("Delete should throw error if user not exists", async () => {
    const { notExistsUserID } = mocks;
    const errorMessage =
      errorMessages.getUserWithGivenIDNotFoundMessage(notExistsUserID);
    await expect(Users.Delete(notExistsUserID)).rejects.toThrow(errorMessage);
  });
});
