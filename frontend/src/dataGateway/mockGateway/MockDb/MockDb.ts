import { defaultMockDbData } from "./defaultMockDbData";
import { MockDbData } from "./mockDbData";

class MockDb {
  private static mockDb: MockDbData = defaultMockDbData;

  public static SetMockDbData(mockDbData: MockDbData) {
    this.mockDb = mockDbData;
  }

  public static get Users() {
    return this.mockDb.users;
  }

  public static get Providers() {
    return this.mockDb.providers;
  }

  public static get ProviderProducts() {
    return this.mockDb.providerProducts;
  }

  public static get Products() {
    return this.mockDb.products;
  }

  public static get Clients() {
    return this.mockDb.clients;
  }

  public static get Bills() {
    return this.mockDb.bills;
  }
}

export default MockDb;
