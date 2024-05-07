"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var result = dotenv.config();
if (result.error) {
    console.log("Error loading environment variables, aborting.");
    process.exit(1);
}
console.log(process.env.PORT);
var express = require("express");
var fs = require("fs");
var https = require("https");
var utils_1 = require("./utils/utils");
var logger_1 = require("./logger");
var data_source_1 = require("./data-source");
var cors = require("cors");
var bodyParser = require("body-parser");
var commandLineArgs = require('command-line-args');
var cookieParser = require('cookie-parser');
//const apiRoutes = require('./routes/index')
var userRoutes_1 = require("./routes/userRoutes");
var lessonsRoutes_1 = require("./routes/lessonsRoutes");
var app = express();
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
function setupExpress() {
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use('/api/users', userRoutes_1.default);
    app.use('/api/lessons', lessonsRoutes_1.default);
}
function startServer() {
    var port;
    var portEnv = process.env.PORT, portArg = process.argv[2];
    if ((0, utils_1.isInteger)(portEnv)) {
        port = parseInt(portEnv);
    }
    if (!port && (0, utils_1.isInteger)(portArg)) {
        port = parseInt(portArg);
    }
    if (!port) {
        port = 9000;
    }
    var httpsServer = https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app);
    // launch an HTTPS Server. Note: this does NOT mean that the application is secure
    httpsServer.listen(port, function () { return console.log("HTTPS Secure Server running at https://localhost:" + port); });
}
data_source_1.AppDataSource.initialize()
    .then(function () {
    logger_1.logger.info("The datasource has been initialized successfully.");
    setupExpress();
    startServer();
})
    .catch(function (err) {
    logger_1.logger.error("Error during datasource initialization.", err);
    process.exit(1);
});
