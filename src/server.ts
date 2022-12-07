import http from "http";
import { bootstrap } from "./app";

bootstrap()
    .then(app => {
        const server = http.createServer(app);

        server.listen(1000, () => console.log(app.get("port")));
    });