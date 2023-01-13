import { Router } from "express";
import { Container } from "typedi";

import { asyncHandler } from "../utils/index";
import { IndexController } from "../controller";
import { authMiddleware } from "../middlewares";

const indexRouter = Router();
const indexController = Container.get(IndexController);

indexRouter.get("/", asyncHandler(indexController.indexRender));
indexRouter.get("/test", authMiddleware);

export { indexRouter };
