import { Router } from "express";
import { Container } from "typedi";

import { asyncHandler } from "../utils/index";
import { UserController } from "../controllers";

const userRouter = Router();
const userController = Container.get(UserController);

userRouter.get("/signup", asyncHandler(userController.signupRender));
userRouter.post("/signup", asyncHandler(userController.signup));
userRouter.post("/signin", asyncHandler(userController.signin));

export { userRouter };
