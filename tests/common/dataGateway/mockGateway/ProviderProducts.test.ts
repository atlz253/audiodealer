import ProviderProducts from "../../../../common/src/dataGateway/mockGateway/ProviderProducts";
import { default as mocks } from "./mocks/providerProductsMocks";
import { default as errorMessages } from "../../../../common/src/dataGateway/errors/ProviderProductsErrorsMessages";
import { default as productsErrorMessages } from "../../../../common/src/dataGateway/errors/ProductsErrorsMessages";
import MockDb from "../../../../common/src/dataGateway/mockGateway/MockDb/MockDb";

describe("Mock gateway provider products", () => {
  beforeEach(() => {
    const mockDbData = mocks.getProviderProductsMockDb();
    MockDb.SetMockDbData(mockDbData);
  });

  test("Get should return provider products array", async () => {
    const { existProviderID, getTestExpectProviderProducts } = mocks;
    const providerProducts = await ProviderProducts.Get(existProviderID);
    expect(providerProducts).toEqual(getTestExpectProviderProducts);
  });

  test("Get should throw error if provider not exist", async () => {
    const { notExistProviderID } = mocks;
    const errorMessage =
      errorMessages.getProductsNotFoundForProviderWithGivenID(
        notExistProviderID,
      );
    await expect(ProviderProducts.Get(notExistProviderID)).rejects.toThrow(
      errorMessage,
    );
  });

  test("Add should add product to provider's assortment", async () => {
    const {
      getDeliveryDays,
      existProviderID,
      notInExistProviderProductsProductID,
      addTestExpectProviderProducts,
    } = mocks;
    const deliveryDays = getDeliveryDays();
    await ProviderProducts.Add(
      existProviderID,
      notInExistProviderProductsProductID,
      deliveryDays,
    );
    const providerProducts = await ProviderProducts.Get(existProviderID);
    expect(providerProducts).toEqual(addTestExpectProviderProducts);
  });

  test("Add should throw error if provider not exists", async () => {
    const { getDeliveryDays, notExistProviderID, existProductID } = mocks;
    const deliveryDays = getDeliveryDays();
    const errorMessage =
      errorMessages.getProductsNotFoundForProviderWithGivenID(
        notExistProviderID,
      );
    await expect(
      ProviderProducts.Add(notExistProviderID, existProductID, deliveryDays),
    ).rejects.toThrow(errorMessage);
  });

  test("Add should throw error if product not exists", async () => {
    const { getDeliveryDays, existProviderID, notExistProductID } = mocks;
    const deliveryDays = getDeliveryDays();
    const errorMessage =
      productsErrorMessages.getProductWithGivenIDNotFoundMessage(
        notExistProductID,
      );
    await expect(
      ProviderProducts.Add(existProviderID, notExistProductID, deliveryDays),
    ).rejects.toThrow(errorMessage);
  });

  test("Add should throw error if product has been added already", async () => {
    const {
      getDeliveryDays,
      existProviderID,
      inExistProviderProductsProductID,
    } = mocks;
    const deliveryDays = getDeliveryDays();
    const errorMessage =
      errorMessages.getProductWithGivenIDAlreadyBeenAddedForProviderWithGivenIDMessage(
        inExistProviderProductsProductID,
        existProviderID,
      );
    await expect(
      ProviderProducts.Add(
        existProviderID,
        inExistProviderProductsProductID,
        deliveryDays,
      ),
    ).rejects.toThrow(errorMessage);
  });

  test("Delete should delete product from provider's assortment", async () => {
    const {
      deleteTestExpectProviderProducts,
      existProviderID,
      inExistProviderProductsProductID,
    } = mocks;
    await ProviderProducts.Delete(
      existProviderID,
      inExistProviderProductsProductID,
    );
    const providerProducts = await ProviderProducts.Get(existProviderID);
    expect(providerProducts).toEqual(deleteTestExpectProviderProducts);
  });

  test("Delete should throw error if provider not exists", async () => {
    const { notExistProviderID, existProductID } = mocks;
    const errorMessage =
      errorMessages.getProductsNotFoundForProviderWithGivenID(
        notExistProviderID,
      );
    await expect(
      ProviderProducts.Delete(notExistProviderID, existProductID),
    ).rejects.toThrow(errorMessage);
  });

  test("Delete should throw error if product not exists in provider's assortment", async () => {
    const { existProviderID, notInExistProviderProductsProductID } = mocks;
    const errorMessage =
      errorMessages.getProductWithGivenIDNotFoundForProviderWithGivenIDMessage(
        notInExistProviderProductsProductID,
        existProviderID,
      );
    await expect(
      ProviderProducts.Delete(
        existProviderID,
        notInExistProviderProductsProductID,
      ),
    ).rejects.toThrow(errorMessage);
  });
});
