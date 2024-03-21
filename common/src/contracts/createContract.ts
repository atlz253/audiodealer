import ID from "../../interfaces/ID";
import INewContract from "../../interfaces/INewContract";
import ICheques from "../../interfaces/ICheques";
import { DateTime } from "luxon";
// import Logger from "../../../backend/src/logger";
import DataGateway from "../dataGateway/DataGateway";

async function createContract(contract: INewContract): Promise<ID> {
  const { id } = await DataGateway.Contracts.Create(contract);

  const cheques: ICheques = {};

  contract.products.forEach((product) => {
    const key = product.deliveryDays;

    if (cheques[key] === undefined) {
      cheques[key] = [product];
    } else {
      cheques[key].push(product);
    }
  });

  for (let key in cheques) {
    const deliveryDate = DateTime.now()
      .plus({ days: Number(key) })
      .toISO();

    if (deliveryDate === null) {
      // FIXME: throw Error
      // Logger.error("Не получилось определить дату доставки");

      continue;
    }

    const chequeID = await DataGateway.Cheques.Create(
      id,
      deliveryDate,
      cheques[key],
    );
  }

  return { id };
}

export default createContract;
