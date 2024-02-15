import IClient from "../../../../common/interfaces/IClient";
import { default as AbstractClients } from "../abstractGateway/Clients";
import MockDb from "./MockDb/MockDb";
import ClientsBills from "./ClientsBills";
import { getNewMockBillUserID } from "./mockObjectID";
import Bills from "./Bills";
import { default as errorMessages } from "../errors/ClientsErrorsMessages";
import DataGatewayError from "../errors/DataGatewayError";

class Clients extends AbstractClients {
  public static get Bills() {
    return ClientsBills;
  }

  public static async Get(onlyNames?: boolean) {
    return structuredClone(MockDb.Clients);
  }

  public static async GetByID(id: number) {
    if (this.IsClientWithIDExist(id)) {
      return structuredClone(MockDb.Clients[id]);
    } else {
      throw new DataGatewayError(
        errorMessages.getClientWithGivenIDNotFoundMessage(id),
      );
    }
  }

  public static async GetCount() {
    return MockDb.Clients.length;
  }

  public static async Create(client: IClient) {
    client.id = getNewMockBillUserID();
    const clientClone = structuredClone(client);
    MockDb.Clients.push(clientClone);
    Bills.CreateBillStorageForUserWithID(client.id);
    return client;
  }

  public static async Save(client: IClient) {
    if (this.IsClientWithIDExist(client.id)) {
      MockDb.Clients[client.id] = structuredClone(client);
    } else {
      throw new DataGatewayError(
        errorMessages.getClientWithGivenIDNotFoundMessage(client.id),
      );
    }
  }

  public static async Delete(id: number): Promise<void> {
    if (this.IsClientWithIDExist(id)) {
      delete MockDb.Clients[id];
    } else {
      throw new DataGatewayError(
        errorMessages.getClientWithGivenIDNotFoundMessage(id),
      );
    }
  }

  private static IsClientWithIDExist(id: number) {
    return MockDb.Clients[id] !== undefined;
  }
}

export default Clients;
