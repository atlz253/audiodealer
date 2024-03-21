import { FC, useState, useEffect } from "react";
import IBaseBill from "../../../common/interfaces/IBaseBill";
import tryServerRequest from "../utils/tryServerRequest";
import Bills from "../components/Bills";
import IBill from "../../../common/interfaces/IBill";
import DataGateway from "../../../common/src/dataGateway/DataGateway";

const BillsPage: FC = () => {
  const [bills, setBills] = useState<IBaseBill[] | null>([]);

  useEffect(() => {
    if (DataGateway.AuthToken === "") {
      return;
    }

    tryServerRequest(async () => {
      const bills = await DataGateway.DealerBills.Get();

      setBills(bills as IBaseBill[]);
    });
  }, []);

  return (
    <Bills
      bills={bills}
      setBills={setBills}
      getBill={(id: number) => DataGateway.DealerBills.GetByID(id)}
      saveBill={(bill: IBill) => DataGateway.DealerBills.Save(bill)}
      createBill={(bill: IBill) => DataGateway.DealerBills.Create(bill)}
      deleteBill={(id: number) => DataGateway.DealerBills.Delete(id)}
      className="p-1"
    />
  );
};

export default BillsPage;
