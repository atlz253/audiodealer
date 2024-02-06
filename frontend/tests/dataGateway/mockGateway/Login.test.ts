import Login from "../../../src/dataGateway/mockGateway/Login";
import MockDb from "../../../src/dataGateway/mockGateway/MockDb/MockDb";
import { default as mocks } from "./mocks/usersMocks";
import { default as errorMessages } from "../../../src/dataGateway/errors/LoginErrorsMessages";

describe("Mock data gateway login", () => {
  beforeEach(() => {
    const mockDbData = mocks.getAdminAndDealerMock();
    MockDb.SetMockDbData(mockDbData);
  });

  test("Login should return auth data if authorization successful", async () => {
    const authorizationData = await Login.Login(mocks.existUserCredentials);
    expect(authorizationData).toEqual(mocks.expectExistUserAuthorizationData);
  });

  test("Login should throw error if user not exists", async () => {
    const errorMessage = errorMessages.getLoginFailedMessage();
    await expect(Login.Login(mocks.notExistUserCredentials)).rejects.toThrow(
      errorMessage,
    );
  });

  test("Login should throw error if user password wrong", async () => {
    const errorMessage = errorMessages.getLoginFailedMessage();
    await expect(
      Login.Login(mocks.dealerCredentialsWithWrongPassword),
    ).rejects.toThrow(errorMessage);
  });
});
