import {
  default as AbstractProducts,
  IProductsSelectAllParams,
} from "../abstractGateway/Products";
import IProduct from "../../../interfaces/IProduct";
import DB from "../../../../backend/src/DB/DB";
import DBMoneyConverter from "../../../../backend/src/utils/DBMoneyConverter";
import { QueryConfig } from "pg";
import pool from "../../../../backend/src/DB/pool";
import ID from "../../../interfaces/ID";
import format from "pg-format";
import Logger from "../../../../backend/src/logger";
import IBaseProduct from "../../../interfaces/IBaseProduct";
import ICount from "../../../interfaces/ICount";

class Products extends AbstractProducts {
  public static async Get(params?: Partial<IProductsSelectAllParams>) {
    const queryParams = params
      ? format(
          `
                    %s
                    %s
                `,
          params.onlyAvaibleInStock ? "AND products.quantity > 0" : "",
          params.avaibleForOrder
            ? "AND providers_products.products_product_id = products.product_id"
            : "",
        )
      : "";

    const additionalTables = params
      ? format(
          `
                        %s
                    `,
          params.avaibleForOrder ? ", providers_products" : "",
        )
      : "";

    Logger.debug(queryParams);

    const query = format(
      `
                SELECT DISTINCT ON (products.product_id)
                    products.product_id AS id,
                    products.name,
                    categories.name AS category,
                    products.price,
                    products.quantity
                FROM
                    products,
                    categories
                    %s
                WHERE
                    products.category_id = categories.category_id
                    %s
            `,
      additionalTables,
      queryParams,
    );

    const result = await pool.query<IBaseProduct>(query);

    for (let i = 0; i < result.rowCount; i++) {
      const row = result.rows[i];

      row.price = DBMoneyConverter.ConvertMoneyToNumber(row.price);
    }

    return result.rows;
  }

  public static async GetByID(id: number) {
    const query: QueryConfig = {
      text: `
                SELECT
                    products.product_id as id,
                    products.name,
                    categories.name as category,
                    products.price,
                    products.quantity,
                    products.description,
                    manufacturers.name as manufacturer
                FROM
                    products,
                    categories,
                    manufacturers
                WHERE
                    products.product_id = $1 AND
                    products.category_id = categories.category_id AND
                    products.manufacturer_id = manufacturers.manufacturer_id
            `,
      values: [id],
    };

    const result = await pool.query<IProduct>(query);

    for (let i = 0; i < result.rowCount; i++) {
      const row = result.rows[i];

      row.price = DBMoneyConverter.ConvertMoneyToNumber(row.price);
    }

    return result.rows[0];
  }

  public static async GetCount() {
    const query: QueryConfig = {
      text: `
                SELECT
                    COUNT(*)
                FROM
                    products
            `,
    };

    const result = await pool.query<ICount>(query);

    return result.rows[0].count;
  }

  public static async Create(product: IProduct) {
    const categoryID = await DB.Categories.GetIDByName(product.category);
    const manufacturerID = await DB.Manufacturers.GetIDByName(
      product.manufacturer,
    );
    const price = DBMoneyConverter.ConvertNumberToMoney(product.price);

    const query: QueryConfig = {
      text: `
                INSERT INTO
                    products (
                        name,
                        price,
                        quantity,
                        description,
                        category_id,
                        manufacturer_id
                    )
                VALUES
                    ($1, $2, $3, $4, $5, $6)
                RETURNING
                    product_id as id
            `,
      values: [
        product.name,
        price,
        product.quantity,
        product.description,
        categoryID,
        manufacturerID,
      ],
    };

    const result = await pool.query<ID>(query);

    return result.rows[0];
  }

  public static async Save(product: IProduct) {
    const categoryID = await DB.Categories.GetIDByName(product.category);
    const manufacturerID = await DB.Manufacturers.GetIDByName(
      product.manufacturer,
    );
    const price = DBMoneyConverter.ConvertNumberToMoney(product.price);

    const query: QueryConfig = {
      text: `
                UPDATE
                    products
                SET
                    name = $1,
                    price = $2,
                    quantity = $3,
                    description = $4,
                    category_id = $5,
                    manufacturer_id = $6
                WHERE
                    product_id = $7
            `,
      values: [
        product.name,
        price,
        product.quantity,
        product.description,
        categoryID,
        manufacturerID,
        product.id,
      ],
    };

    await pool.query(query);
  }

  public static async UpdateQuantityByChequeID(
    chequeID: number,
    operation: string,
  ) {
    const query = format(
      `
                UPDATE
                    products
                SET
                    quantity = products.quantity %s cheques_products.product_quantity
                FROM
                    cheques,
                    cheques_products
                WHERE
                    cheques.cheque_id = %s AND
                    cheques_products.cheques_cheque_id = cheques.cheque_id AND
                    cheques_products.products_product_id = products.product_id
            `,
      operation,
      chequeID,
    );

    await pool.query(query);
  }

  public static async Delete(id: number) {
    const query: QueryConfig = {
      text: `
                DELETE FROM
                    products
                WHERE
                    product_id = $1
            `,
      values: [id],
    };

    await pool.query(query);
  }
}

export default Products;
