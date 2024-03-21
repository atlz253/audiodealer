import IBaseProduct from "../../../common/interfaces/IBaseProduct";
import IProduct from "../../../common/interfaces/IProduct";
import express, { NextFunction, Request, Response, response } from "express";
import dealerAuthCheck from "../middleware/dealerAuthCheck";
import jwtCheck from "../middleware/jwtCheck";
import DB from "../DB/DB";
import ID from "../../../common/interfaces/ID";
import RequestBody from "../interfaces/RequestBody";
import expressAsyncHandler from "express-async-handler";
import Logger from "../logger";
import ICount from "../../../common/interfaces/ICount";
import DataGateway from "../../../frontend/src/dataGateway/DataGateway";

const productsRouter = express.Router();

productsRouter.use(jwtCheck);
productsRouter.use(dealerAuthCheck);

productsRouter.get(
  "/",
  expressAsyncHandler(
    async (
      req: RequestBody,
      res: Response<IBaseProduct[]>,
      next: NextFunction,
    ) => {
      const products = await DataGateway.Products.Get();

      res.json(products);
    },
  ),
);

productsRouter.get(
  "/count",
  expressAsyncHandler(async (req: RequestBody, res: Response<ICount>) => {
    const count = await DataGateway.Products.GetCount();

    res.json({ count });
  }),
);

productsRouter.get(
  "/:productID",
  expressAsyncHandler(async (req: RequestBody, res: Response<IProduct>) => {
    const product = await DataGateway.Products.GetByID(
      Number(req.params.productID),
    );

    res.json(product);
  }),
);

productsRouter.post(
  "/new",
  expressAsyncHandler(async (req: RequestBody<IProduct>, res: Response<ID>) => {
    const id = await DataGateway.Products.Create(req.body);

    res.json(id);
  }),
);

productsRouter.put(
  "/:productID",
  expressAsyncHandler(async (req: RequestBody<IProduct>, res: Response) => {
    await DataGateway.Products.Save(req.body);

    res.sendStatus(200);
  }),
);

productsRouter.delete(
  "/:productID",
  expressAsyncHandler(async (req: RequestBody, res: Response) => {
    await DataGateway.Products.Delete(Number(req.params.productID));

    Logger.info(`${req.jwt?.login} удалил товар с ID ${req.params.productID}`);

    res.sendStatus(200);
  }),
);

export default productsRouter;
