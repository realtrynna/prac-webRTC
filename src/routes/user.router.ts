import { Router } from "express";
import { Container } from "typedi";

import { asyncHandler } from "../utils/index";
import { UserController } from "../controller";

const userRouter = Router();
const userController = Container.get(UserController);

userRouter.get("/signup", asyncHandler(userController.signUpRender));
userRouter.post("/signup", asyncHandler(userController.signUp));
userRouter.post("/signin", asyncHandler(userController.signIn));

export { userRouter };
