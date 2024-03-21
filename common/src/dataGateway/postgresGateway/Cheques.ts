import {
  default as AbstractCheques,
  IChequeSelectParams,
} from "../abstractGateway/Cheques";
import ChequesProducts from "../../../../backend/src/DB/ChequesProducts";
import ICheque from "../../../interfaces/ICheque";
import { QueryConfig } from "pg";
import pool from "../../../../backend/src/DB/pool";
import format from "pg-format";
import ID from "../../../interfaces/ID";
import IContractProduct from "../../../interfaces/IContractProduct";

class Cheques extends AbstractCheques {
  public static get Products(): typeof ChequesProducts {
    return ChequesProducts;
  }

  public static async Get(
    params?: Partial<IChequeSelectParams>,
  ): Promise<ICheque[]> {
    const queryParams = params
      ? format(
          `
                    %s
                    %s
                `,
          params.contractID
            ? format("AND cheques.contract_id = %s", params.contractID)
            : "",
          params.chequeStatus
            ? format("AND cheques.status = %L", params.chequeStatus)
            : "",
        )
      : "";

    const query = format(
      `
                SELECT
                    cheques.cheque_id AS id,
                    cheques.delivery_date AS "deliveryDate",
                    cheques.status,
                    contracts.type
                FROM
                    cheques,
                    contracts
                WHERE
                    cheques.contract_id = contracts.contract_id
                    %s
            `,
      queryParams,
    );

    const result = await pool.query<ICheque>(query);

    return result.rows;
  }

  public static async Create(
    contractID: number,
    deliveryDate: string,
    products: IContractProduct[],
  ) {
    const query: QueryConfig = {
      text: `
                INSERT INTO
                    cheques (
                        delivery_date,
                        contract_id,
                        status
                    )
                VALUES
                    (
                        $1,
                        $2,
                        'unpaid'
                    )
                RETURNING
                    cheque_id AS id
            `,
      values: [deliveryDate, contractID],
    };

    const result = await pool.query<ID>(query);

    await this.Products.Insert(result.rows[0].id, products);

    return result.rows[0];
  }

  public static async Save(contractID: number, cheque: ICheque) {
    const query: QueryConfig = {
      text: `
                UPDATE
                    cheques
                SET
                    status = $1
                WHERE
                    cheque_id = $2
            `,
      values: [cheque.status, cheque.id],
    };

    await pool.query(query);
  }
}

export default Cheques;
