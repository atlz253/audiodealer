import IBaseProduct from "../../../../common/interfaces/IBaseProduct";
import IProduct from "../../../../common/interfaces/IProduct";
import ID from "../../../../common/interfaces/ID";
import AuthTokenKeeper from "./AuthTokenKeeper";

class Products extends AuthTokenKeeper {
  public static async Get(): Promise<IBaseProduct[]> {
    throw new Error("Not implemented");
  }

  public static async GetByID(id: number): Promise<IProduct> {
    throw new Error("Not implemented");
  }

  public static async GetCount(): Promise<number> {
    throw new Error("Not implemented");
  }

  public static async Create(product: IProduct): Promise<ID> {
    throw new Error("Not implemented");
  }

  public static async Save(product: IProduct): Promise<void> {
    throw new Error("Not implemented");
  }

  public static async Delete(id: number): Promise<void> {
    throw new Error("Not implemented");
  }
}

export default Products;
