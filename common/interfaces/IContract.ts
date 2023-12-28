import IBaseContract from "./IBaseContract";
import IBaseProduct from "./IBaseProduct";
import IBill from "./IBill";
import ICheque from "./ICheque";

interface IContract extends IBaseContract {
  sellerBill: IBill;
  buyerBill: IBill;
  cheques: ICheque[];
  products: IBaseProduct[];
}

export default IContract;
