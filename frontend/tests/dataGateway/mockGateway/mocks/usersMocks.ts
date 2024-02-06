import IAuth from "../../../../../common/interfaces/IAuth";
import IAuthorization from "../../../../../common/interfaces/IAuthorization";
import { MockDbData } from "../../../../src/dataGateway/mockGateway/MockDb/mockDbData";

function getAdminAndDealerMock(): MockDbData {
  return {
    users: [
      {
        id: 0,
        type: "dealer",
        firstName: "Dealer",
        login: "dealer",
        password: "dealer",
      },
      {
        id: 1,
        type: "admin",
        firstName: "Admin",
        login: "admin",
        password: "admin",
      },
    ],
    providers: [],
    providerProducts: [],
    products: [],
    clients: [],
    bills: [],
  };
}

type ReadonlyAuthorization = Readonly<IAuthorization>;

const existUserCredentials: ReadonlyAuthorization = {
  login: "dealer",
  password: "dealer",
};

const expectExistUserAuthorizationData: Readonly<IAuth> = {
  // TODO: rename IAuth to Credential (make derived from IUser)
  accessToken: "0",
  login: "dealer",
  type: "dealer",
};

const notExistUserCredentials: ReadonlyAuthorization = {
  login: "notExistUser",
  password: "notExistUserPassword",
};

const dealerCredentialsWithWrongPassword: ReadonlyAuthorization = {
  login: "dealer",
  password: "wrongPassword",
};

export default {
  getAdminAndDealerMock,
  existUserCredentials,
  expectExistUserAuthorizationData,
  notExistUserCredentials,
  dealerCredentialsWithWrongPassword,
} as const;
