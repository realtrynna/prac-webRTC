import "reflect-metadata";

import path from "path";
import express from "express";
import morgan from "morgan";
import nunjucks from "nunjucks";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { port } from "./config";
import { indexRouter, userRouter, roomRouter } from "./routes/index";

export async function bootstrap() {
    const app = express();
    const __dirname = path.resolve();
    const __path = path.join(__dirname, "src", "views");

    dotenv.config();

    app.set("port", port);
    app.set("view engine", "html");
    nunjucks.configure(__path, {
        express: app,
        watch: true,
    });

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use("/", indexRouter);
    app.use("/user", userRouter);
    app.use("/room", roomRouter);

    return app;
}
