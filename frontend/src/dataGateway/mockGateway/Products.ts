import IProduct from "../../../../common/interfaces/IProduct";
import { default as AbstractProducts } from "../abstractGateway/Products";
import MockDb from "./MockDb/MockDb";
import { getNewMockObjectID } from "./mockObjectID";
import { default as errorMessages } from "../errors/ProductsErrorsMessages";
import DataGatewayError from "../errors/DataGatewayError";

class Products extends AbstractProducts {
  public static async Get() {
    return structuredClone(MockDb.Products);
  }

  public static async GetByID(id: number) {
    const product = MockDb.Products.find((product) => product.id === id);

    if (product) {
      return structuredClone(product);
    }

    throw new DataGatewayError(
      errorMessages.getProductWithGivenIDNotFoundMessage(id),
    );
  }

  public static async GetCount() {
    return MockDb.Products.length;
  }

  public static async Create(product: IProduct) {
    product.id = getNewMockObjectID(MockDb.Products);
    const productClone = structuredClone(product);
    MockDb.Products.push(productClone);
    return product;
  }

  public static async Save(product: IProduct) {
    const productIndex = this.TryGetProductIndexByID(product.id);
    MockDb.Products[productIndex] = structuredClone(product);
  }

  public static async Delete(id: number) {
    const productIndex = this.TryGetProductIndexByID(id);
    MockDb.Products.splice(productIndex, 1);
  }

  private static TryGetProductIndexByID(productID: number): number {
    const productIndex = MockDb.Products.findIndex((p) => p.id === productID);

    if (productIndex === -1) {
      throw new DataGatewayError(
        errorMessages.getProductWithGivenIDNotFoundMessage(productID),
      );
    } else {
      return productIndex;
    }
  }
}

export default Products;
