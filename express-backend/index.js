const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const usersTable = require('./src/usersTable');

const app = express();

// Middleware
app.use(bodyparser.json());
app.use(cors());

// Globals
const HOST = 'localhost';
const PORT = 8000;
const usersTableInstance = new usersTable(app);

app.listen(PORT, async ()=>{
    console.log(`Server running on: ${HOST}:${PORT}`);
});