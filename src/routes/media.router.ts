import { Request, Response } from "express";
import { Router } from "express";

const mediaRouter = Router();

mediaRouter.get("/", (req, res) => {
    return res.render("media");
});

export { mediaRouter };