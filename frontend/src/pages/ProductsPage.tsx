import { FC, useEffect, useState } from "react";
import IBaseProduct from "../../../common/interfaces/IBaseProduct";
import tryServerRequest from "../utils/tryServerRequest";
import Products from "../components/Products";
import IProduct from "../../../common/interfaces/IProduct";
import ID from "../../../common/interfaces/ID";
import DataGateway from "../../../common/src/dataGateway/DataGateway";

const ProductsPage: FC = () => {
  const [products, setProducts] = useState<IBaseProduct[]>([]);

  useEffect(() => {
    if (DataGateway.AuthToken === "") {
      return;
    }

    tryServerRequest(async () => {
      const response: IBaseProduct[] = await DataGateway.Products.Get();

      setProducts(response);
    });
  }, []);

  const createProduct = async (product: IProduct): Promise<ID> => {
    const response = await DataGateway.Products.Create(product);

    setProducts([...products, product]);

    return response;
  };

  const deleteProduct = async (id: number): Promise<void> => {
    await DataGateway.Products.Delete(id);

    const newProducts = products.filter((product) => product.id !== id);

    setProducts(newProducts);
  };

  const saveProduct = async (product: IProduct): Promise<void> => {
    await DataGateway.Products.Save(product);

    const newProducts = products.map((p) => {
      if (p.id === product.id) {
        return product;
      }

      return p;
    });

    setProducts(newProducts);
  };

  return (
    <Products
      products={products}
      productModalProps={{
        getProduct: (id: number) => DataGateway.Products.GetByID(id),
        createProduct: createProduct,
        saveProduct: saveProduct,
        deleteProduct: deleteProduct,
      }}
    />
    // <>

    //     <div className="d-flex flex-fill flex-column p-1">
    //         <div className="d-flex flex-fill justify-content-end" style={{ maxHeight: "40px", height: "40px" }}>
    //             <IconButton
    //                 icon={faPlus}
    //                 text="Добавить"
    //                 className="ms-1"
    //                 onClick={() => navigate("/products/new")}
    //             />
    //         </div>
    //         <ProductsTable
    //             products={products}
    //             onRowClick={(id: number) => navigate(`/products/${id}`)}
    //             rowTitle="Нажмите, чтобы просмотреть товар"
    //         />
    //     </div>
    // </>
  );
};

export default ProductsPage;
