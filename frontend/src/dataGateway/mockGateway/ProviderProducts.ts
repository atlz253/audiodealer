import IDeliveryDays from "../../../../common/interfaces/IDeliveryDays";
import IProduct from "../../../../common/interfaces/IProduct";
import { default as AbstractProviderProducts } from "../abstractGateway/ProviderProducts";
import MockDb from "./MockDb/MockDb";
import MockGateway from "./MockGateway";
import { ProviderProductMockDb } from "./MockDb/mockDbData";
import { default as errorMessages } from "../errors/ProviderProductsErrorsMessages";
import DataGatewayError from "../errors/DataGatewayError";

class ProviderProducts extends AbstractProviderProducts {
  public static async Get(providerID: number) {
    const products = await this.GetProviderProductsByProviderID(providerID);
    const productsClone = structuredClone(products);
    return productsClone;
  }

  private static async GetProviderProductsByProviderID(providerID: number) {
    const productsID = this.TryGetProviderProductMocksByProviderID(providerID);
    const providerProducts =
      await this.GetProductsByProviderProductsMocks(productsID);
    return providerProducts;
  }

  private static async GetProductsByProviderProductsMocks(
    providerProductsMock: ProviderProductMockDb[],
  ): Promise<IProduct[]> {
    const providerProducts = [];
    for (const productMock of providerProductsMock) {
      const product = await this.GetProductByProviderProductMock(productMock);
      providerProducts.push(product);
    }
    return providerProducts;
  }

  private static async GetProductByProviderProductMock(
    providerProductMock: ProviderProductMockDb,
  ): Promise<IProduct> {
    const product = await MockGateway.Products.GetByID(providerProductMock.id);
    product.deliveryDays = providerProductMock.deliveryDays;
    return product;
  }

  public static async Add(
    providerID: number,
    productID: number,
    deliveryDays: IDeliveryDays,
  ) {
    await MockGateway.Products.GetByID(productID);
    const productMocks = this.TryGetProviderProductMocksByProviderID(providerID);
    const isProductAdded = productMocks.some(
      (product) => product.id === productID,
    );

    if (isProductAdded) {
      throw new DataGatewayError(
        errorMessages.getProductWithGivenIDAlreadyBeenAddedForProviderWithGivenIDMessage(
          productID,
          providerID,
        ),
      );
    }

    productMocks.push({
      id: productID,
      deliveryDays: deliveryDays.deliveryDays,
    });
  }

  public static async Delete(providerID: number, productID: number) {
    const productMocks = this.TryGetProviderProductMocksByProviderID(providerID);
    const productMockIndex = productMocks.findIndex(
      (mock) => mock.id === productID,
    );

    if (productMockIndex === -1) {
      throw new DataGatewayError(
        errorMessages.getProductWithGivenIDNotFoundForProviderWithGivenIDMessage(
          productID,
          providerID,
        ),
      );
    } else {
      productMocks.splice(productMockIndex, 1);
    }
  }

  private static TryGetProviderProductMocksByProviderID(
    providerID: number,
  ): ProviderProductMockDb[] {
    const products = MockDb.ProviderProducts[providerID];

    if (products) {
      return products;
    }

    throw new DataGatewayError(
      errorMessages.getProductsNotFoundForProviderWithGivenID(providerID),
    );
  }
}

export default ProviderProducts;
