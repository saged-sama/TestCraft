import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import cors from "cors";
import users from "./modules/users.mjs";

const useMiddleWares = (app) => {
    app.use(bodyParser.json());
    app.use(cors());
}

// Globals
const HOSTNAME = "localhost";
const PORT = 8000;

// Main function
function main(){
    const app = express();
    
    useMiddleWares(app);
    const usersInstance = new users(app);
    console.log("")
    ViteExpress.listen(app, PORT, async ()=>{
        console.log(`Server running on: http://${HOSTNAME}:${PORT}`);
    });
}

main();