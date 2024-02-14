import IAuth from "../../../../../common/interfaces/IAuth";
import IAuthorization from "../../../../../common/interfaces/IAuthorization";
import IUser from "../../../../../common/interfaces/IUser";
import { MockDbData } from "../../../../src/dataGateway/mockGateway/MockDb/mockDbData";

const firstAdminID = 0;
const existDealerID = 1;
const notExistsUserID = 999;

function getAdminAndDealerMock(): MockDbData {
  return {
    users: [
      {
        id: 0,
        type: "admin",
        firstName: "Admin",
        login: "admin",
        password: "admin",
      },
      {
        id: existDealerID,
        type: "dealer",
        firstName: "Dealer",
        login: "dealer",
        password: "dealer",
      },
    ],
    providers: [],
    providerProducts: [],
    products: [],
    clients: [],
    bills: [],
  };
}

function getUser(): IUser {
  return {
    id: 999,
    type: "dealer",
    firstName: "Dealer",
  };
}

const existUserCredentials: Readonly<IAuthorization> = {
  login: "dealer",
  password: "dealer",
};

const expectExistUserAuthorizationData: Readonly<IAuth> = {
  // TODO: rename IAuth to Credential (make derived from IUser)
  accessToken: existDealerID.toString(),
  login: "dealer",
  type: "dealer",
};

const notExistUserCredentials: Readonly<IAuthorization> = {
  login: "notExistUser",
  password: "notExistUserPassword",
};

const dealerCredentialsWithWrongPassword: Readonly<IAuthorization> = {
  login: "dealer",
  password: "wrongPassword",
};

export default {
  getAdminAndDealerMock,
  getUser,
  firstAdminID, // TODO: global constant?
  existDealerID,
  notExistsUserID,
  existUserCredentials,
  expectExistUserAuthorizationData,
  notExistUserCredentials,
  dealerCredentialsWithWrongPassword,
} as const;
