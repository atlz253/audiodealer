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
    if (this.IsProductWithIDExist(id)) {
      return structuredClone(MockDb.Products[id]);
    } else {
      throw new DataGatewayError(
        errorMessages.getProductWithGivenIDNotFoundMessage(id),
      );
    }
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
    if (this.IsProductWithIDExist(product.id)) {
      MockDb.Products[product.id] = structuredClone(product);
    } else {
      throw new DataGatewayError(
        errorMessages.getProductWithGivenIDNotFoundMessage(product.id),
      );
    }
  }

  public static async Delete(id: number) {
    if (this.IsProductWithIDExist(id)) {
      delete MockDb.Products[id];
    } else {
      throw new DataGatewayError(
        errorMessages.getProductWithGivenIDNotFoundMessage(id),
      );
    }
  }

  private static IsProductWithIDExist(id: number) {
    return MockDb.Products[id] !== undefined;
  }
}

export default Products;
