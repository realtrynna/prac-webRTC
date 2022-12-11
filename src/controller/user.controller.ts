import { Request, Response } from "express";
import { Service } from "typedi";

import { UserService } from "../services";

import { SignUpDto } from "../dtos";

@Service()
export class UserController {
    constructor (private readonly userService: UserService) {}

    signUpRender = async (
        _req: Request,
        res: Response
    ) => {
        return res.render("signup");
    }

    signUp = async (
        { body }: Request<unknown, unknown, SignUpDto>,
        res: Response 
    ) => {
        const signUp = await this.userService.signUp(body);

        return res.status(201).json({
            success: true,
            data: signUp,
            message: "회원가입 성공",
        });
    }
    
    signIn = async (
        { body }: Request<unknown, unknown, SignUpDto>,
        res: Response
    ) => {
        const signIn = await this.userService.signIn(body);

        return res.status(200).json({
            success: true,
            token: signIn,
            message: "로그인 성공",
        });
    }
}