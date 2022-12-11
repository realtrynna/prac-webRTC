import { Router } from "express";
import { Container } from "typedi";

import { asyncHandler } from "../utils/index";
import { ChatListController } from "../controller";

const chatRouter = Router();
const chatController = Container.get(ChatListController);

chatRouter.get("/", asyncHandler(chatController.chatRender));

export { chatRouter }