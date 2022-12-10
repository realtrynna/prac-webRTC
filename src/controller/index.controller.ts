import { Request, Response } from "express";
import { Service } from "typedi";

import { IndexService } from "../services/index";

@Service()
export class IndexController {
    constructor (private readonly indexService: IndexService) {}

    indexRender = async (_req: Request, res: Response) => {
        return res.render("index");
    }
    
    joinRoom = async (req: Request, res: Response) => {
        console.log("서버 실행");
        const io = req.app.get("io");
        
        io.of("/room").emit("roomJoin", "hello!!!");
        
        res.json("here");
    }
}