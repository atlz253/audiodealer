import IDeliveryDays from "../../../../common/interfaces/IDeliveryDays";
import IProduct from "../../../../common/interfaces/IProduct";
import ProviderProducts from "../abstractGateway/ProviderProducts";
import MockGateway from "./MockGateway";
import {
  IProviderProductMock,
  providerProductsID,
} from "./mocks/providerProducts";

class MockGatewayProviderProducts extends ProviderProducts {
  public static async Get(providerID: number) {
    const products = await this.GetProviderProductsByProviderID(providerID);
    const productsClone = structuredClone(products);
    return productsClone;
  }

  private static async GetProviderProductsByProviderID(providerID: number) {
    const productsID = this.GetProviderProductMocksByProviderID(providerID);
    const providerProducts =
      await this.GetProductsByProviderProductsMocks(productsID);
    return providerProducts;
  }

  private static async GetProductsByProviderProductsMocks(
    providerProductsMock: IProviderProductMock[],
  ): Promise<IProduct[]> {
    const providerProducts = [];
    for (const productMock of providerProductsMock) {
      const product = await MockGateway.Products.GetByID(productMock.id);
      providerProducts.push(product);
    }
    return providerProducts;
  }

  public static async Add(
    providerID: number,
    productID: number,
    deliveryDays: IDeliveryDays,
  ) {
    const productMocks = this.GetProviderProductMocksByProviderID(providerID);
    productMocks.push({
      id: productID,
      deliveryDays: deliveryDays.deliveryDays,
    });
  }

  public static async Delete(providerID: number, productID: number) {
    const productMocks = this.GetProviderProductMocksByProviderID(providerID);
    const productMockIndex = productMocks.findIndex(
      (mock) => mock.id === productID,
    );

    if (productMockIndex === -1) {
      throw new Error(
        `Product with ID ${productID} not found for provider with ID ${providerID}`,
      );
    } else {
      productMocks.splice(productMockIndex, 1);
    }
  }

  private static GetProviderProductMocksByProviderID(
    providerID: number,
  ): IProviderProductMock[] {
    const products = providerProductsID[providerID];

    if (products) {
      return products;
    }

    throw new Error(`Products not found for provider with ID ${providerID}`);
  }
}

export default MockGatewayProviderProducts;