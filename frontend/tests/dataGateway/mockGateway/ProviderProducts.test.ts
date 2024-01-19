import ProviderProducts from "../../../src/dataGateway/mockGateway/ProviderProducts";
import { cloneAndSetMockDbData } from "./cloneAndSetMockDbData";
import {
  addTestExpectProviderProducts,
  deleteTestExpectProviderProducts,
  getTestExpectProviderProducts,
  providerProductsMock,
} from "./mocks/providerProductsMocks";

describe("Mock gateway provider products", () => {
  beforeEach(() => {
    cloneAndSetMockDbData(providerProductsMock);
  });

  test("Get should return provider products array", async () => {
    const providerID = 0;
    const providerProducts = await ProviderProducts.Get(providerID);
    expect(providerProducts).toEqual(getTestExpectProviderProducts);
  });

  test("Add should add product to provider's assortment", async () => {
    const productID = 1;
    const providerID = 0;
    const deliveryDays = 5;
    await ProviderProducts.Add(providerID, productID, { deliveryDays });
    const providerProducts = await ProviderProducts.Get(providerID);
    expect(providerProducts).toEqual(addTestExpectProviderProducts);
  });

  test("Add should throw error if product not exists", async () => {
    const providerID = 0;
    const deliveryDays = 100;
    const notExistsProductID = 999;
    await expect(
      ProviderProducts.Add(providerID, notExistsProductID, { deliveryDays }),
    ).rejects.toThrow(`Product with ID ${notExistsProductID} not found`);
  });

  test("Add should throw error if product has been added already", async () => {
    const providerID = 0;
    const deliveryDays = 5;
    const addedProductID = 0;
    await expect(
      ProviderProducts.Add(providerID, addedProductID, { deliveryDays }),
    ).rejects.toThrow(
      `Product with ID ${addedProductID} already been added for provider with ID ${providerID}`,
    );
  });

  test("Delete should delete product from provider's assortment", async () => {
    const productID = 2;
    const providerID = 0;
    await ProviderProducts.Delete(providerID, productID);
    const providerProducts = await ProviderProducts.Get(providerID);
    expect(providerProducts).toEqual(deleteTestExpectProviderProducts);
  });

  test("Delete should throw error if product not exists in provider's assortment", async () => {
    const providerID = 0;
    const notExistsProductID = 1;
    await expect(
      ProviderProducts.Delete(providerID, notExistsProductID),
    ).rejects.toThrow(
      `Product with ID ${notExistsProductID} not found for provider with ID ${providerID}`,
    );
  });

  test("Methods should throw error if provider not exists", async () => {
    const notExistsProviderID = 999;
    const productID = 1;
    const deliveryDays = 100;
    const errorMessage = `Products not found for provider with ID ${notExistsProviderID}`;
    await expect(ProviderProducts.Get(notExistsProviderID)).rejects.toThrow(
      errorMessage,
    );
    await expect(
      ProviderProducts.Add(notExistsProviderID, productID, { deliveryDays }),
    ).rejects.toThrow(errorMessage);
    await expect(
      ProviderProducts.Delete(notExistsProviderID, productID),
    ).rejects.toThrow(errorMessage);
  });
});
