import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

dotenv.config();

import database from "./modules/database.mjs";
import users from "./modules/users.mjs";
import channels from "./modules/channels.mjs";
import collections from "./modules/collections.mjs";
import problems from "./modules/problems.mjs";

const useMiddleWares = (app) => {
    app.use(bodyParser.json());
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(cookieParser());
}

// Globals
const HOSTNAME = "localhost";
const PORT = 8000;

// Main function
function main(){
    const app = express();
    useMiddleWares(app);

    const databaseInstance = database();
    users(app, databaseInstance);
    channels(app, databaseInstance);
    collections(app, databaseInstance);
    problems(app, databaseInstance);

    ViteExpress.listen(app, PORT, async ()=>{
        console.log(`Server running on: http://${HOSTNAME}:${PORT}`);
    });
}

main();