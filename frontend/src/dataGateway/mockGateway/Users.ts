import ID from "../../../../common/interfaces/ID";
import IUser from "../../../../common/interfaces/IUser";
import { default as AbstractUsers } from "../abstractGateway/Users";
import DataGatewayError from "../errors/DataGatewayError";
import Bills from "./Bills";
import MockDb from "./MockDb/MockDb";
import { getNewMockBillUserID } from "./mockObjectID";
import { default as errorMessages } from "../errors/UsersErrorsMessages";

class Users extends AbstractUsers {
  public static async Get(): Promise<IUser[]> {
    const usersClone = structuredClone(MockDb.Users);
    return usersClone;
  }

  public static async GetByID(id: number): Promise<IUser> {
    const user = MockDb.Users.find((user) => user.id === id);

    if (user) {
      return structuredClone(user);
    }

    throw new DataGatewayError(
      errorMessages.getUserWithGivenIDNotFoundMessage(id),
    );
  }

  public static async Create(user: IUser): Promise<ID> {
    user.id = getNewMockBillUserID();
    const userClone = structuredClone(user);
    MockDb.Users.push(userClone);
    Bills.CreateBillStorageForUserWithID(user.id);
    return user;
  }

  public static async Save(user: IUser): Promise<void> {
    const userIndex = this.TryGetUserIndexByID(user.id);

    const userClone = structuredClone(user);
    MockDb.Users[userIndex] = userClone;
  }

  public static async Delete(id: number): Promise<void> {
    if (id === 0) {
      throw new DataGatewayError(
        errorMessages.getFirstAdminDeleteNotAllowedMessage(),
      );
    }

    const userIndex = this.TryGetUserIndexByID(id);

    MockDb.Users.splice(userIndex, 1);
  }

  private static TryGetUserIndexByID(id: number) { // TODO: move to MockDb?
    const userIndex = MockDb.Users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new DataGatewayError(
        errorMessages.getUserWithGivenIDNotFoundMessage(id),
      );
    }

    return userIndex;
  }
}

export default Users;
