import http from "http";
import chalk from "chalk";

import { bootstrap } from "./app";
import socketServer from "./socket";

bootstrap()
    .then(app => {
        const server = http.createServer(app);

        socketServer(server);
        
        server.listen(1000, () => {
            console.log(chalk.bgBlue.red(`
                🛡️Server listening on port ${app.get("port")}🛡️
            `));
        });
    });