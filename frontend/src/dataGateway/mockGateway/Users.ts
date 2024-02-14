import ID from "../../../../common/interfaces/ID";
import IUser from "../../../../common/interfaces/IUser";
import { default as AbstractUsers } from "../abstractGateway/Users";
import DataGatewayError from "../errors/DataGatewayError";
import Bills from "./Bills";
import MockDb from "./MockDb/MockDb";
import { getNewMockBillUserID } from "./mockObjectID";
import { default as errorMessages } from "../errors/UsersErrorsMessages";
import objectToArray from "../../utils/objectToArray";

class Users extends AbstractUsers {
  public static async Get(): Promise<IUser[]> {
    return structuredClone(objectToArray(MockDb.Users));
  }

  public static async GetByID(id: number): Promise<IUser> {
    if (MockDb.Users[id] === undefined) {
      throw new DataGatewayError(
        errorMessages.getUserWithGivenIDNotFoundMessage(id),
      );
    } else {
      return structuredClone(MockDb.Users[id]);
    }
  }

  public static async Create(user: IUser): Promise<ID> {
    user.id = getNewMockBillUserID();
    const userClone = structuredClone(user);
    MockDb.Users[user.id] = userClone;
    Bills.CreateBillStorageForUserWithID(user.id);
    return user;
  }

  public static async Save(user: IUser): Promise<void> {
    if (this.IsUserExist(user.id)) {
      MockDb.Users[user.id] = structuredClone(user);
    } else {
      throw new DataGatewayError(
        errorMessages.getUserWithGivenIDNotFoundMessage(user.id),
      );
    }
  }

  public static async Delete(id: number): Promise<void> {
    if (id === 0) {
      throw new DataGatewayError(
        errorMessages.getFirstAdminDeleteNotAllowedMessage(),
      );
    } else if (this.IsUserExist(id)) {
      delete MockDb.Users[id];
    } else {
      throw new DataGatewayError(
        errorMessages.getUserWithGivenIDNotFoundMessage(id),
      );
    }
  }

  private static IsUserExist(id: number) {
    return MockDb.Users[id] !== undefined;
  }
}

export default Users;
