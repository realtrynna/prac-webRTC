import { Router } from "express";
import { Container } from "typedi";

import { asyncHandler } from "../utils/index";
import { IndexController } from "../controller";

const indexRouter = Router();
const indexController = Container.get(IndexController);

indexRouter.get("/", asyncHandler(indexController.indexRender));
indexRouter.post("/", asyncHandler(indexController.joinRoom));

export { indexRouter };
