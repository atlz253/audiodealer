import IBaseProduct from "../../../../common/interfaces/IBaseProduct";
import IProduct from "../../../../common/interfaces/IProduct";
import ID from "../../../../common/interfaces/ID";
import AuthTokenKeeper from "./AuthTokenKeeper";
import { default as errorMessages } from "../errors/DataGatewayErrorMessages";
import DataGatewayError from "../errors/DataGatewayError";

export interface IProductsSelectAllParams {
  onlyAvaibleInStock: boolean;
  avaibleForOrder: boolean;
}

class Products extends AuthTokenKeeper {
  public static async Get(
    params?: Partial<IProductsSelectAllParams>,
  ): Promise<IBaseProduct[]> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Get.name,
      ),
    );
  }

  public static async GetByID(id: number): Promise<IProduct> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.GetByID.name,
      ),
    );
  }

  public static async GetCount(): Promise<number> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.GetCount.name,
      ),
    );
  }

  public static async Create(product: IProduct): Promise<ID> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Create.name,
      ),
    );
  }

  public static async Save(product: IProduct): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Save.name,
      ),
    );
  }

  public static async UpdateQuantityByChequeID(
    // TODO: refactor
    chequeID: number,
    operation: string,
  ): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.UpdateQuantityByChequeID.name,
      ),
    );
  }

  public static async Delete(id: number): Promise<void> {
    throw new DataGatewayError(
      errorMessages.getClassMethodNotImplementedErrorMessage(
        this.name,
        this.Delete.name,
      ),
    );
  }
}

export default Products;
