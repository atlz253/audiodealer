import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IContract from "../../../common/interfaces/IContract";
import Contract from "../components/Contract";
import ItemPage from "../components/ItemPage";
import tryServerRequest from "../utils/tryServerRequest";
import INewContract from "../../../common/interfaces/INewContract";
import IContractProduct from "../../../common/interfaces/IContractProduct";
import DataGateway from "../../../common/src/dataGateway/DataGateway";

interface IContractPageProps {
  newContract?: boolean;
}

const ContractPage: FC<IContractPageProps> = ({ newContract }) => {
  const { contractID } = useParams();
  const [contract, setContract] = useState<IContract>({
    id: 0,
    sellerName: "",
    buyerName: "",
    price: 0,
    created: "",
    status: "open",
    type: "sell",
    sellerBill: {
      id: 0,
      correspondentBill: "",
      BIC: "",
      INN: "",
      ownerName: "",
      billNumber: "",
      bankName: "",
      expireDate: "",
    },
    buyerBill: {
      id: 1,
      correspondentBill: "",
      BIC: "",
      INN: "",
      ownerName: "",
      billNumber: "",
      bankName: "",
      expireDate: "",
    },
    products: [],
    cheques: [],
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  const [cancelModalShow, setCancelModalShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const getContract = (id: number) => {
    tryServerRequest(async () => {
      const contract = await DataGateway.Contracts.GetByID(id);

      setContract(contract);
    });
  };

  useEffect(() => {
    if (newContract) {
      setIsEditMode(true);

      return;
    }

    if (DataGateway.AuthToken === "") {
      return;
    }

    getContract(Number(contractID));
  }, []);

  const deleteContract = () => {
    navigate("/contracts");
  };

  const saveContract = () => {
    tryServerRequest(async () => {
      const newContract: INewContract = {
        id: 0,
        sellerBillID: contract.sellerBill.id,
        buyerBillID: contract.buyerBill.id,
        type: contract.type,
        products: contract.products.map((product) => {
          const productQuantity: IContractProduct = {
            id: product.id,
            quantity: product.quantity,
            deliveryDays: product.deliveryDays ? product.deliveryDays : 0,
          };

          return productQuantity;
        }),
      };

      const response = await DataGateway.Contracts.Create(newContract);

      navigate("/contracts/" + response.id);

      getContract(response.id);

      setIsEditMode(false);
    });
  };

  return (
    <ItemPage
      deleteModalProps={{
        isShow: deleteModalShow,
        setIsShow: setDeleteModalShow,
        title: "Удаление договора",
        body: `Вы действительно хотите удалить договор №${contract.id}?`,
      }}
      cancelModalProps={{
        isShow: cancelModalShow,
        setIsShow: setCancelModalShow,
        title: "Отмена изменений",
        body: "Вы точно хотите отменить редактирование? Измененные данные не сохранятся.", // TODO: реализовать cancelEditModal
        onApprove: () => navigate("/contracts"),
      }}
      itemPageBarProps={{
        isEditMode: isEditMode,
        backClickAction: () => navigate("/contracts"),
        saveClickAction: saveContract,
        cancelEditClickAction: () => setCancelModalShow(true),
      }}
    >
      <h1 className="text-center">
        {newContract ? "Новый договор" : `Договор №${contract.id}`}
      </h1>
      <Contract
        contract={contract}
        setContract={setContract}
        isEditMode={isEditMode}
        newContract={newContract}
      />
    </ItemPage>
  );
};

export default ContractPage;
