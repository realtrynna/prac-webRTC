import "reflect-metadata";

import path from "path";
import express from "express";
import morgan from "morgan";
import nunjucks from "nunjucks";

import { port } from "./config";
import { indexRouter, userRouter, mediaRouter } from "./routes/index";

export async function bootstrap() {
    const app = express();
    const __dirname = path.resolve();
    const __path = path.join(__dirname, "src", "views");

    app.set("port", port);
    app.set("view engine", "html");
    nunjucks.configure(__path, {
        express: app,
        watch: true,
    });

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/", indexRouter);
    app.use("/user", userRouter);
    app.use("/media", mediaRouter);

    return app;
}