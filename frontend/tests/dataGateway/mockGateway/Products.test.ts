import MockDb from "../../../src/dataGateway/mockGateway/MockDb/MockDb";
import Products from "../../../src/dataGateway/mockGateway/Products";
import {
  existProductID,
  getProductMock,
  getProductsMockDbData,
  notExistProductID,
} from "./mocks/productsMocks";

describe("Mock data gateway products", () => {
  beforeEach(() => {
    const mockDbData = getProductsMockDbData();
    MockDb.SetMockDbData(mockDbData);
  });

  test("Get should return products array clone", async () => {
    const products = await Products.Get();
    expect(products).toBeClone(MockDb.Products);
  });

  test("GetByID should return product clone with given productID", async () => {
    const product = await Products.GetByID(existProductID);
    const productFromDb = MockDb.FindProductByID(existProductID);
    expect(product).toBeClone(productFromDb);
  });

  test("GetByID should throw error if product not exists", async () => {
    await expect(Products.GetByID(notExistProductID)).rejects.toThrow(
      `Product with ID ${notExistProductID} not found`,
    );
  });

  test("GetCount should return products count", async () => {
    const productsCount = await Products.GetCount();
    expect(productsCount).toEqual(MockDb.Products.length);
  });

  test("Create should save product clone to products array", async () => {
    const newProduct = getProductMock();
    const { id: newProductID } = await Products.Create(newProduct);
    newProduct.id = newProductID;
    const productFromDb = MockDb.FindProductByID(newProductID);
    expect(productFromDb).toBeClone(newProduct);
  });

  test("Save should save product clone to products array", async () => {
    const productForSave = await Products.GetByID(existProductID);
    productForSave.name = "New product name";
    await Products.Save(productForSave);
    const productFromDb = MockDb.FindProductByID(productForSave.id);
    expect(productFromDb).toBeClone(productForSave);
  });

  test("Delete should delete product from products array", async () => {
    const product = MockDb.FindProductByID(existProductID);
    expect(product).not.toBeUndefined();
    await Products.Delete(existProductID);
    const productSearchResult = MockDb.FindProductByID(existProductID);
    expect(productSearchResult).toBeUndefined();
  });
});
