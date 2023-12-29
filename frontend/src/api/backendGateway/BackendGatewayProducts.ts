import axios from "axios";
import IBaseProduct from "../../../../common/interfaces/IBaseProduct";
import Products from "../abstractGateway/Products";
import { baseURL } from "./BackendGatewayConfig";
import IProduct from "../../../../common/interfaces/IProduct";
import ICount from "../../../../common/interfaces/ICount";
import ID from "../../../../common/interfaces/ID";


class BackendGatewayProducts extends Products {
  public static async Get(): Promise<IBaseProduct[]> {
    const request = await axios.get<IBaseProduct[]>(baseURL + "/products", {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data;
  }

  public static async GetByID(id: number): Promise<IProduct> {
    const request = await axios.get<IProduct>(baseURL + "/products/" + id, {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data;
  }

  public static async GetCount(): Promise<number> {
    const request = await axios.get<ICount>(baseURL + "/products/count", {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data.count;
  }

  public static async Create(product: IProduct): Promise<ID> {
    const request = await axios.post<ID>(baseURL + "/products/new", product, {
      headers: {
        authorization: this.authToken,
      },
    });

    return request.data;
  }

  public static async Save(product: IProduct): Promise<void> {
    await axios.put(baseURL + "/products/" + product.id, product, {
      headers: {
        authorization: this.authToken,
      },
    });
  }

  public static async Delete(id: number): Promise<void> {
    await axios.delete(baseURL + "/products/" + id, {
      headers: {
        authorization: this.authToken,
      },
    });
  }
}

export default Products;
