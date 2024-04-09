import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import database from "./modules/database.mjs";
import users from "./modules/users.mjs";
import channels from "./modules/channels.mjs";
import collections from "./modules/collections.mjs";

const useMiddleWares = (app) => {
    app.use(bodyParser.json());
    app.use(cors());
    app.use(cookieParser());
}

// Globals
const HOSTNAME = "localhost";
const PORT = 8000;

// Main function
function main(){
    const app = express();
    useMiddleWares(app);

    const databaseInstance = new database();

    const usersInstance = new users(app, databaseInstance);
    const channelsInstance = new channels(app, databaseInstance);
    const collectionInstance = new collections(app, databaseInstance);

    ViteExpress.listen(app, PORT, async ()=>{
        console.log(`Server running on: http://${HOSTNAME}:${PORT}`);
    });
}

main();