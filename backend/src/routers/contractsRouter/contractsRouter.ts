import express, { Request, Response } from "express";
import IBaseContract from "../../../../common/interfaces/IBaseContract";
import IContract from "../../../../common/interfaces/IContract";
import dealerAuthCheck from "../../middleware/dealerAuthCheck";
import jwtCheck from "../../middleware/jwtCheck";
import expressAsyncHandler from "express-async-handler";
import RequestBody from "../../interfaces/RequestBody";
import INewContract from "../../../../common/interfaces/INewContract";
import ID from "../../../../common/interfaces/ID";
import chequesRouter from "./chequesRouter";
import ICount from "../../../../common/interfaces/ICount";
import DataGateway from "../../../../frontend/src/dataGateway/DataGateway";
import createContract from "../../../../common/src/contracts/createContract";

const contractsRouter = express.Router();

contractsRouter.use(jwtCheck);
contractsRouter.use(dealerAuthCheck);

contractsRouter.use("/:contractID/cheques", chequesRouter);

contractsRouter.get(
  "/",
  expressAsyncHandler(
    async (req: RequestBody, res: Response<IBaseContract[]>) => {
      const contracts = await DataGateway.Contracts.Get();

      res.json(contracts);
    },
  ),
);

contractsRouter.get(
  "/count",
  expressAsyncHandler(async (req: RequestBody, res: Response<ICount>) => {
    const contractStatus = req.query.contractStatus;

    if (typeof contractStatus !== "string" && contractStatus !== undefined) {
      throw new Error("Был передан некорректный параметр contractStatus");
    }

    const count = await DataGateway.Contracts.GetCount(contractStatus);

    res.json({ count });
  }),
);

contractsRouter.get(
  "/:contractID",
  expressAsyncHandler(async (req: RequestBody, res: Response<IContract>) => {
    const contractID = Number(req.params.contractID);

    const contract = await DataGateway.Contracts.GetByID(contractID);

    res.json(contract);
  }),
);

contractsRouter.post(
  "/new",
  expressAsyncHandler(
    async (req: RequestBody<INewContract>, res: Response<ID>) => {
      const id = await createContract(req.body);

      res.json(id);
    },
  ),
);

export default contractsRouter;
