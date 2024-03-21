import MockDb from "../../../../common/src/dataGateway/mockGateway/MockDb/MockDb";
import Products from "../../../../common/src/dataGateway/mockGateway/Products";
import { default as mocks } from "./mocks/productsMocks";
import { default as errorMessages } from "../../../../common/src/dataGateway/errors/ProductsErrorsMessages";

describe("Mock data gateway products", () => {
  beforeEach(() => {
    const mockDbData = mocks.getProductsMockDbData();
    MockDb.SetMockDbData(mockDbData);
  });

  test("Get should return products array clone", async () => {
    const products = await Products.Get();
    expect(products).toBeClone(MockDb.Products);
  });

  test("GetByID should return product clone with given productID", async () => {
    const { existProductID } = mocks;
    const product = await Products.GetByID(existProductID);
    const productFromDb = MockDb.Products[existProductID];
    expect(product).toBeClone(productFromDb);
  });

  test("GetByID should throw error if product not exists", async () => {
    const { notExistProductID } = mocks;
    const errorMessage =
      errorMessages.getProductWithGivenIDNotFoundMessage(notExistProductID);
    await expect(Products.GetByID(notExistProductID)).rejects.toThrow(
      errorMessage,
    );
  });

  test("GetCount should return products count", async () => {
    const productsCount = await Products.GetCount();
    expect(productsCount).toEqual(MockDb.Products.length);
  });

  test("Create should save product clone to products array and return product ID", async () => {
    const newProduct = mocks.getProductMock();
    const { id: newProductID } = await Products.Create(newProduct);
    newProduct.id = newProductID;
    const productFromDb = MockDb.Products[newProductID];
    expect(productFromDb).toBeClone(newProduct);
  });

  test("Save should save product clone to products array", async () => {
    const { existProductID } = mocks;
    const productForSave = await Products.GetByID(existProductID);
    productForSave.name = "New product name";
    await Products.Save(productForSave);
    const productFromDb = MockDb.Products[productForSave.id];
    expect(productFromDb).toBeClone(productForSave);
  });

  test("Save should throw error if product not exists in products array", async () => {
    const product = mocks.getProductMock();
    const errorMessage = errorMessages.getProductWithGivenIDNotFoundMessage(
      product.id,
    );
    await expect(Products.Save(product)).rejects.toThrow(errorMessage);
  });

  test("Delete should delete product from products array", async () => {
    const { existProductID } = mocks;
    const product = MockDb.Products[existProductID];
    expect(product).not.toBeUndefined();
    await Products.Delete(existProductID);
    const productSearchResult = MockDb.Products[existProductID];
    expect(productSearchResult).toBeUndefined();
  });

  test("Delete should throw error if product not exists in products array", async () => {
    const { notExistProductID } = mocks;
    const errorMessage =
      errorMessages.getProductWithGivenIDNotFoundMessage(notExistProductID);
    await expect(Products.Delete(notExistProductID)).rejects.toThrow(
      errorMessage,
    );
  });
});
