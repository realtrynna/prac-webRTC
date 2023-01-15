import { Request, Response } from "express";
import { Service } from "typedi";

@Service()
export class IndexController {
    constructor () {}

    indexRender = async (_req: Request, res: Response) => {
        return res.render("index");
    }
}