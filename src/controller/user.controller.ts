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
        req: Request<unknown, unknown, SignUpDto>,
        res: Response 
    ) => {
            
    
        // const signUpUserResult = await this.userService.signUp(body);

        // return res.status(201).json(signUpUserResult);
    }   
}