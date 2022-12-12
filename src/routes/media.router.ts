import { Router } from "express";
import { Container } from "typedi";

import { asyncHandler } from "../utils/index";
import { MediaController } from "../controller";

const mediaRouter = Router();
const mediaController = Container.get(MediaController);

mediaRouter.get("/", asyncHandler(mediaController.mediaRender));

export { mediaRouter };