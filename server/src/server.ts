import * as dotenv from "dotenv";

const result = dotenv.config();

if (result.error) {
    console.log(`Error loading environment variables, aborting.`);
    process.exit(1);
}

console.log(process.env.PORT);


import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { root } from "./routes/root";
import { isInteger } from "./utils/utils";
import {logger} from "./logger";
import {AppDataSource} from "./data-source";


const cors = require("cors");
const bodyParser = require("body-parser");
const commandLineArgs = require('command-line-args');
const cookieParser = require('cookie-parser');




//const apiRoutes = require('./routes/index')
import usersRouter from './routes/userRoutes';
import lessonsRouter from './routes/lessonsRoutes';
import coursesRouter from './routes/coursesRoutes';
import locationsRouter  from './routes/locationsRoutes';
import logoutRouter  from './routes/logoutRoutes';
import loginRouter  from './routes/loginRoutes';
const app = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }



function setupExpress() {
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use('/api/users',usersRouter);    
    app.use('/api/lessons',lessonsRouter);
    app.use('/api/courses',coursesRouter);    
    app.use('/api/locations',locationsRouter);    
    app.use('/api/login',loginRouter);
  

}


function startServer() {

    let port: number;

    const portEnv = process.env.PORT,
        portArg = process.argv[2];

    if (isInteger(portEnv)) {
        port = parseInt(portEnv);
    }

    if (!port && isInteger(portArg)) {
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



AppDataSource.initialize()
    .then(() => {
        logger.info(`The datasource has been initialized successfully.`);
        setupExpress();
        startServer();
    })
    .catch(err => {
        logger.error(`Error during datasource initialization.`, err);
        process.exit(1);
    })

