const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const users = require('./src/users');

// Globals
const HOST = process.env.HOSTNAME;
const PORT = process.env.PORT;

// MiddleWares
function handleMiddleWares(app){
    app.use(bodyparser.json());
    app.use(cors());
}

// Main function
function main(){
    const app = express();

    handleMiddleWares(app);
    const usersInstance = new users(app);

    app.listen(PORT, async ()=>{
        console.log(`Server running on: ${HOST}:${PORT}`);
    });
}

main();