import { defaultMockDbData } from "./defaultMockDbData";
import { MockDbData } from "./mockDbData";

class MockDb {
  private static mockDb: MockDbData = defaultMockDbData;

  public static CloneAndSetMockDbData(mockDbData: MockDbData) {
    const mockDbDataClone = structuredClone(mockDbData);
    this.SetMockDbData(mockDbDataClone);
    return mockDbDataClone;
  }

  public static SetMockDbData(mockDbData: MockDbData) {
    this.mockDb = mockDbData;
  }

  public static FindUserByID(id: number) {
    return this.Users.find((user) => user.id === id);
  }

  public static get Users() {
    return this.mockDb.users;
  }

  public static FindProviderByID(id: number) {
    return this.Providers.find((provider) => provider.id === id);
  }

  public static get Providers() {
    return this.mockDb.providers;
  }

  public static get ProviderProducts() {
    return this.mockDb.providerProducts;
  }

  public static FindProductByID(id: number) {
    return this.Products.find((product) => product.id === id);
  }

  public static get Products() {
    return this.mockDb.products;
  }

  public static FindClientByID(id: number) {
    return this.Clients.find((client) => client.id === id);
  }

  public static get Clients() {
    return this.mockDb.clients;
  }

  public static FindBillByOwnerIDAndBillID(ownerID: number, billID: number) {
    const ownerBills = this.Bills[ownerID];

    if (!ownerBills) {
      return undefined;
    } else {
      return ownerBills.find((bill) => bill.id === billID);
    }
  }

  public static get Bills() {
    return this.mockDb.bills;
  }
}

export default MockDb;
