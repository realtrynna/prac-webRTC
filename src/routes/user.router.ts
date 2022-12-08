import { Router } from "express";
import { Container } from "typedi";

import { asyncHandler } from "../utils/index";
import { UserController } from "../controller";

const userRouter = Router();
const userController = Container.get(UserController);

userRouter.get("/", asyncHandler(userController.signUpRender));
userRouter.post("/", asyncHandler(userController.signUp));

export { userRouter };
