import IProduct from "../../../../common/interfaces/IProduct";
import Products from "../abstractGateway/Products";
import { getNextMockID } from "./mockID";
import { products } from "./mocks/products";

class MockGatewayProducts extends Products {
  public static async Get() {
    return structuredClone(products);
  }

  public static async GetByID(id: number) {
    const product = products.find((product) => product.id === id);

    if (product) {
      return structuredClone(product);
    }

    throw new Error(`Product with ID ${id} not found`);
  }

  public static async GetCount() {
    return products.length;
  }

  public static async Create(product: IProduct) {
    product.id = getNextMockID(products);
    const productClone = structuredClone(product);
    products.push(productClone);
    return product;
  }

  public static async Save(product: IProduct) {
    const productIndex = this.TryGetProductIndexByID(product.id);
    products[productIndex] = structuredClone(product);
  }

  public static async Delete(id: number) {
    const productIndex = this.TryGetProductIndexByID(id);
    products.splice(productIndex, 1);
  }

  private static TryGetProductIndexByID(productID: number): number {
    const productIndex = products.findIndex((p) => p.id === productID);

    if (productIndex === -1) {
      throw new Error(`Product with ID ${productID} not found`);
    } else {
      return productIndex;
    }
  }
}

export default MockGatewayProducts;
