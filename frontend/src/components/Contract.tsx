import IBill from "../../../common/interfaces/IBill";
import Bill from "./Bill";
import ProductsTable, { ProductsIndexing } from "./ProductsTable";
import IContract from "../../../common/interfaces/IContract";
import {
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  ChangeEvent,
  useContext,
} from "react";
import Categories from "./Categories/Categories";
import NamedSelect from "./NamedInputs/NamedSelect";
import tryServerRequest from "../utils/tryServerRequest";
import API from "../api/API";
import IName from "../../../common/interfaces/IName";
import IBillNumber from "../../../common/interfaces/IBillNumber";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";
import ProductsModal from "./ProductsModal";
import IBaseProduct from "../../../common/interfaces/IBaseProduct";
import Products from "./Products";
import CategoryItem from "./Categories/CategoryItem";
import { AuthContext } from "../context";
import ChequesTable from "./ChequesTable";
import ICheque from "../../../common/interfaces/ICheque";

interface IContractProps {
  contract: IContract;
  setContract: Dispatch<SetStateAction<IContract>>;
  isEditMode?: boolean;
  newContract?: boolean;
}

const Contract: FC<IContractProps> = ({
  contract,
  setContract,
  isEditMode,
  newContract,
}) => {
  const [buyersNames, setBuyersNames] = useState<IName[]>([]);
  const [buyerBillsNumbers, setBuyerBillsNumbers] = useState<IBillNumber[]>([]);
  const [buyerBillOwnerSelect, setBuyerBillOwnerSelect] =
    useState<string>("default");
  const [buyerBillNumberSelect, setBuyerBillNumberSelect] =
    useState<string>("default");
  const [sellerBillsNumbers, setSellersBillsNumbers] = useState<IBillNumber[]>(
    [],
  );
  const [sellerBillNumberSelect, setSellerBillNumberSelect] =
    useState<string>("default");
  const [products, setProducts] = useState<IBaseProduct[]>([]);
  const [sellersNames, setSellersNames] = useState<IName[] | null>(null);
  const [sellerBillNameSelect, setSellerBillNameSelect] =
    useState<string>("default");
  const { auth } = useContext(AuthContext);

  const buyerBillOwnerChange = (value: string) => {
    tryServerRequest(async () => {
      const ID = Number(value);

      const buyerBillsNumbers = await API.Clients.Bills.Get(ID, true);

      setBuyerBillOwnerSelect(value);
      setBuyerBillNumberSelect("default");
      setBuyerBillsNumbers(buyerBillsNumbers);
    });
  };

  const addProduct = (product: IBaseProduct) => {
    const products = [...contract.products, product];

    setContract({ ...contract, products });
  };

  const removeProduct = (product: IBaseProduct) => {
    const products = contract.products.filter((p) => p.id !== product.id);

    setContract({ ...contract, products });
  };

  const changeSellerBill = (value: string) => {
    setSellerBillNumberSelect(value);

    setContract({
      ...contract,
      sellerBill: { ...contract.sellerBill, id: Number(value) },
    });
  };

  const changeBuyerBill = (value: string) => {
    setBuyerBillNumberSelect(value);

    setContract({
      ...contract,
      buyerBill: { ...contract.buyerBill, id: Number(value) },
    });
  };

  const changeContractType = (value: string) => {
    tryServerRequest(async () => {
      switch (value) {
        case "sell":
          const sellerBillsNumbers = await API.DealerBills.Get(true);

          setSellersBillsNumbers(sellerBillsNumbers);

          const products = await API.Products.Get();

          setProducts(products);

          const clientsNames = await API.Clients.Get(true);

          setBuyersNames(clientsNames as IName[]);

          break;
        case "buy":
          const sellerNames = await API.Providers.Get(true);

          setSellersNames(sellerNames);

          const dealerBillsNumbers = await API.DealerBills.Get(true);

          setBuyerBillsNumbers(dealerBillsNumbers);

          setProducts([]);

          setBuyersNames([]);

          break;
      }

      setBuyerBillOwnerSelect("default");
      setSellerBillNameSelect("default");
      setBuyerBillNumberSelect("default");
      setSellerBillNumberSelect("default");
      setContract({ ...contract, type: value });
    });
  };

  const sellerBillOwnerChange = (value: string) => {
    tryServerRequest(async () => {
      const sellerBillsNumbers = await API.Providers.Bills.Get(Number(value));

      const products = await API.Providers.Products.Get(Number(value));

      setProducts(products);

      setSellerBillNameSelect(value);
      setSellerBillNumberSelect("default");
      setSellersBillsNumbers(sellerBillsNumbers);
    });
  };

  const updateCheque = (cheque: ICheque) => {
    tryServerRequest(async () => {
      await API.Contracts.Cheques.Save(contract.id, cheque);

      const newCheques = contract.cheques.map((c) => {
        if (c.id === cheque.id) {
          return cheque;
        }

        return c;
      });

      setContract({ ...contract, cheques: newCheques });

      for (let i = 0; i < newCheques.length; i++) {
        const cheque = newCheques[i];

        if (cheque.status === "unpaid") {
          return;
        }
      }

      setContract({ ...contract, status: "close" });
    });
  };

  return (
    <>
      <Categories defaultActiveKey={["0"]}>
        <CategoryItem name="Общая информация" eventKey="0" notClosable>
          <NamedSelect
            name="Тип договора"
            value={contract.type}
            onChange={(event) => changeContractType(event.target.value)}
          >
            <option value="default" disabled>
              Выберите тип договора
            </option>
            <option value="buy">Покупка</option>
            <option value="sell">Продажа</option>
          </NamedSelect>
          <NamedSelect
            name="Статус договора"
            value={contract.status}
            disabled={true}
          >
            <option value="open">Открыт</option>
            <option value="close">Закрыт</option>
          </NamedSelect>
        </CategoryItem>
        <Categories.Item name="Счет продавца" eventKey="0" notClosable>
          {(newContract && (
            <>
              <NamedSelect
                name="Владелец"
                value={sellerBillNameSelect}
                onChange={(event) => sellerBillOwnerChange(event.target.value)}
                disabled={sellersNames === null || contract.type === "sell"}
              >
                <option value="default" disabled>
                  {contract.type === "sell"
                    ? auth?.login
                    : "Выберите владельца счета"}
                </option>
                {sellersNames?.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </NamedSelect>
              <NamedSelect
                name="Номер счета"
                value={sellerBillNumberSelect}
                onChange={(event) => changeSellerBill(event.target.value)}
                disabled={
                  contract.type !== "sell" && sellerBillNameSelect === "default"
                }
              >
                <option value="default" disabled>
                  Выберите номер счета
                </option>
                {sellerBillsNumbers.map((bill) => (
                  <option key={bill.id} value={bill.id}>
                    {bill.billNumber}
                  </option>
                ))}
              </NamedSelect>
            </>
          )) || (
            <Bill
              bill={contract.sellerBill}
              setBill={(value: IBill) =>
                setContract({ ...contract, sellerBill: value })
              }
              isEditMode={false}
              newBill={newContract}
            />
          )}
        </Categories.Item>
        <Categories.Item name="Счет покупателя" eventKey="0" notClosable>
          {(newContract && (
            <>
              <NamedSelect
                name="Владелец"
                value={buyerBillOwnerSelect}
                onChange={(event) => buyerBillOwnerChange(event.target.value)}
                disabled={contract.type === "buy" || buyersNames.length === 0}
              >
                <option value="default" disabled>
                  {contract.type === "buy"
                    ? auth?.login
                    : "Выберите владельца счета"}
                </option>
                {buyersNames.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </NamedSelect>
              <NamedSelect
                name="Номер счета"
                value={buyerBillNumberSelect}
                onChange={(event) => changeBuyerBill(event.target.value)}
                disabled={
                  contract.type !== "buy" && buyerBillOwnerSelect === "default"
                }
              >
                <option value="default" disabled>
                  Выберите номер счета
                </option>
                {buyerBillsNumbers.map((bill) => (
                  <option key={bill.id} value={bill.id}>
                    {bill.billNumber}
                  </option>
                ))}
              </NamedSelect>
            </>
          )) || (
            <Bill
              bill={contract.buyerBill}
              setBill={(value: IBill) =>
                setContract({ ...contract, buyerBill: value })
              }
              isEditMode={false}
              newBill={newContract}
            />
          )}
        </Categories.Item>
        <Categories.Item name="Счета на оплату" eventKey="0" notClosable>
          <ChequesTable
            cheques={contract.cheques}
            updateCheque={updateCheque}
          />
        </Categories.Item>
        <Categories.Item name="Товары" eventKey="0" notClosable>
          <Products
            products={contract.products}
            addProduct={addProduct}
            removeProduct={removeProduct}
            productsModalProps={{
              products: products,
              setProducts: setProducts,
            }}
          />
        </Categories.Item>
      </Categories>
    </>
  );
};

export default Contract;
