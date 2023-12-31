import { QueryConfig } from "pg";
import pool from "./pool";
import ID from "../../../common/interfaces/ID";
import ICheque from "../../../common/interfaces/ICheque";
import ChequesProducts from "./ChequesProducts";
import format from "pg-format";
import Logger from "../logger";

interface IChequeSelectParams {
  contractID: number;
  chequeStatus: string;
}

class Cheques {
  public static get Products(): typeof ChequesProducts {
    return ChequesProducts;
  }

  public static async Select(
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

  public static async Insert(
    contractID: number,
    deliveryDate: string,
  ): Promise<ID> {
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

    return result.rows[0];
  }

  public static async Update(cheque: ICheque): Promise<void> {
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
