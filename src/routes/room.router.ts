import { Router } from "express";
import { Container } from "typedi";

import { asyncHandler } from "../utils/index";
import { ListController } from "../controllers";
import { authMiddleware } from "../middlewares";

const roomRouter = Router();
const roomController = Container.get(ListController);

roomRouter.get("/", authMiddleware, asyncHandler(roomController.roomRender));

roomRouter.get(
    "/create",
    authMiddleware,
    asyncHandler(roomController.createRoomRender),
);

roomRouter.post(
    "/create",
    authMiddleware,
    asyncHandler(roomController.createRoom),
);

roomRouter.get(
    "/join/:roomId",
    authMiddleware,
    asyncHandler(roomController.joinRoomRender),
);

roomRouter.post(
    "/chat/:roomId",
    authMiddleware,
    asyncHandler(roomController.createChat),
);

export { roomRouter };
