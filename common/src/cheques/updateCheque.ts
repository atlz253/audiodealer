import ICheque from "../../interfaces/ICheque";
import DataGateway from "../dataGateway/DataGateway";

async function updateCheque(contractID: number, cheque: ICheque) {
  await DataGateway.Cheques.Save(contractID, cheque);

  DataGateway.Products.UpdateQuantityByChequeID(
    cheque.id,
    cheque.type === "buy" ? "+" : "-",
  );

  DataGateway.Cheques.Get({
    contractID,
    chequeStatus: "unpaid",
  }).then((cheques) => {
    if (cheques.length === 0) {
      DataGateway.Contracts.UpdateStatus(contractID, "close");
    }
  });
}

export default updateCheque;