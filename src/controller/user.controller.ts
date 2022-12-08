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
        
    }   
}