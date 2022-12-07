import { Request, Response } from "express";
import { Service } from "typedi";

import { UserService } from "../services/index";

@Service()
export class UserController {
    constructor (private readonly userService: UserService) {}

    getUsers = async (req: Request, res: Response) => {
        res.render("index", {
            name: "윤승근",
        });
    }   
}