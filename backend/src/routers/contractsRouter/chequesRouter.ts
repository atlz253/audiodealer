import express, { Response } from "express";
import RequestBody from "../../interfaces/RequestBody";
import expressAsyncHandler from "express-async-handler";
import ICheque from "../../../../common/interfaces/ICheque";
import updateCheque from "../../../../common/src/cheques/updateCheque";

const chequesRouter = express.Router({
  mergeParams: true,
});

chequesRouter.put(
  "/:chequeID",
  expressAsyncHandler(async (req: RequestBody<ICheque>, res: Response) => {
    const contractID = Number(req.params.contractID);

    await updateCheque(contractID, req.body);

    res.sendStatus(200);
  }),
);

export default chequesRouter;
