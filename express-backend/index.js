const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const users = require('./src/users');

// Globals
const HOSTNAME = "localhost";
const PORT = 8000;

// MiddleWares
function handleMiddleWares(app){
    app.use(bodyparser.json());
    app.use(cors());
}

// Main function
function main(){
    const app = express();
    handleMiddleWares(app);
    
    app.listen(PORT, async ()=>{
        console.log(`Server running on: http://${HOSTNAME}:${PORT}`);
    });

    const usersInstance = new users(app);
}

main();