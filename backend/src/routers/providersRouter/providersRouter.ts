import express, { Response } from "express";
import RequestBody from "../../interfaces/RequestBody";
import expressAsyncHandler from "express-async-handler";
import jwtCheck from "../../middleware/jwtCheck";
import dealerAuthCheck from "../../middleware/dealerAuthCheck";
import IBaseProvider from "../../../../common/interfaces/IBaseProvider";
import DB from "../../DB/DB";
import IProvider from "../../../../common/interfaces/IProvider";
import ID from "../../../../common/interfaces/ID";
import billsRouter from "./billsRouter";
import productsRouter from "./productsRouter";
import IName from "../../../../common/interfaces/IName";
import ICount from "../../../../common/interfaces/ICount";

const providersRouter = express.Router();

providersRouter.use(jwtCheck);
providersRouter.use(dealerAuthCheck);

providersRouter.use("/:providerID/bills", billsRouter);
providersRouter.use("/:providerID/products", productsRouter);

providersRouter.get(
  "/",
  expressAsyncHandler(
    async (req: RequestBody, res: Response<IBaseProvider[] | IName[]>) => {
      if (req.query.onlyNames) {
        const names = await DB.Providers.SelectNames();

        res.json(names);
      } else {
        const providers = await DB.Providers.SelectAll();

        res.json(providers);
      }
    },
  ),
);

providersRouter.get(
  "/count",
  expressAsyncHandler(async (req: RequestBody, res: Response<ICount>) => {
    const count = await DB.Providers.SelectCount();

    res.json(count);
  }),
);

providersRouter.get(
  "/:providerID",
  expressAsyncHandler(async (req: RequestBody, res: Response<IProvider>) => {
    const providerID = Number(req.params.providerID);

    const provider = await DB.Providers.Select(providerID);

    res.json(provider);
  }),
);

providersRouter.post(
  "/:providerID",
  expressAsyncHandler(
    async (req: RequestBody<IProvider>, res: Response<ID>) => {
      const id = await DB.Providers.Insert(req.body);

      res.json(id);
    },
  ),
);

providersRouter.put(
  "/:providerID",
  expressAsyncHandler(async (req: RequestBody<IProvider>, res: Response) => {
    await DB.Providers.Update(req.body);

    res.sendStatus(200);
  }),
);

providersRouter.delete(
  "/:providerID",
  expressAsyncHandler(async (req: RequestBody, res: Response) => {
    const providerID = Number(req.params.providerID);

    await DB.Providers.Delete(providerID);

    res.sendStatus(200);
  }),
);

export default providersRouter;
