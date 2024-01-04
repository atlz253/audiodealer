import { FC, useState, useEffect } from "react";
import IconButton from "../components/IconButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IBaseBill from "../../../common/interfaces/IBaseBill";
import DataGateway from "../dataGateway/DataGateway";
import tryServerRequest from "../utils/tryServerRequest";
import { useNavigate } from "react-router-dom";
import BillsTable from "../components/BillsTable";
import Bills from "../components/Bills";
import IBill from "../../../common/interfaces/IBill";

const BillsPage: FC = () => {
  const [bills, setBills] = useState<IBaseBill[] | null>([]);
  const navigate = useNavigate();

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
