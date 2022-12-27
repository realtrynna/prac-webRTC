import { Request, Response } from "express";
import { Service } from "typedi";

import { UserService } from "../services";

import { SignUpDto } from "../dtos";

@Service()
export class UserController {
    constructor (private readonly userService: UserService) {}

    signupRender = async (
        _: Request,
        res: Response
    ) => {
        return res.render("signup");
    }

    signup = async (
        { body }: Request<unknown, unknown, SignUpDto>,
        res: Response 
    ) => {
        const signUp = await this.userService.signUp(body);

        return res.status(201).json({
            success: true,
            data: signUp,
            message: "success",
        });
    }
    
    signin = async (
        { body }: Request<unknown, unknown, SignUpDto>,
        res: Response
    ) => {
        const signIn = await this.userService.signIn(body);

        return res.status(200).json({
            success: true,
            token: signIn,
            message: "success",
        });
    }
}