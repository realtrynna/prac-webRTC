import { Request, Response } from "express";
import { Service } from "typedi";

import { IndexService } from "../services/index";

@Service()
export class IndexController {
    constructor (private readonly indexService: IndexService) {}

    getUsers = async (req: Request, res: Response) => {
        res.render("index", {
            name: "윤승근",
        });
    }   
}