"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
    console.log(`Error loading environment variables, aborting.`);
    process.exit(1);
}
console.log(process.env.PORT);
const express = require("express");
const fs = require("fs");
const https = require("https");
const utils_1 = require("./utils/utils");
const logger_1 = require("./logger");
const data_source_1 = require("./data-source");
const cors = require("cors");
const bodyParser = require("body-parser");
const commandLineArgs = require('command-line-args');
const cookieParser = require('cookie-parser');
const index_1 = require("./routes/index");
const get_user_middleware_1 = require("./middleware/get-user.middleware");
const app = express();
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
function setupExpress() {
    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(get_user_middleware_1.retrieveUserIdFromRequest);
    app.use('/api', index_1.routes);
}
function startServer() {
    let port;
    const portEnv = process.env.PORT, portArg = process.argv[2];
    if ((0, utils_1.isInteger)(portEnv)) {
        port = parseInt(portEnv);
    }
    if (!port && (0, utils_1.isInteger)(portArg)) {
        port = parseInt(portArg);
    }
    if (!port) {
        port = 9000;
    }
    const httpsServer = https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app);
    // launch an HTTPS Server. Note: this does NOT mean that the application is secure
    httpsServer.listen(port, () => console.log("HTTPS Secure Server running at https://localhost:" + port));
}
data_source_1.AppDataSource.initialize()
    .then(() => {
    logger_1.logger.info(`The datasource has been initialized successfully.`);
    setupExpress();
    startServer();
})
    .catch(err => {
    logger_1.logger.error(`Error during datasource initialization.`, err);
    process.exit(1);
});
