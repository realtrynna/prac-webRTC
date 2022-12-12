import http from "http";
import chalk from "chalk";

import { bootstrap } from "./app";
import socketServer from "./socket";
import { port } from "./config";

bootstrap()
    .then(app => {
        const server = http.createServer(app);
        
        process.setMaxListeners(15);

        socketServer(server, app);
        
        server.listen(port, () => {
            console.log(chalk.bgBlue.red(`
                🛡️Server listening on port ${port}🛡️
            `));
        });
    });