const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysqlDB = require('./src/mysqlDB');

const app = express();
const HOST = 'localhost';
const PORT = 8000;

const mysqlDatabase = new mysqlDB();

app.use(bodyparser.json());
app.use(cors());

app.get('/user-pass', async (req, res) => {
    try{
        const rows = await mysqlDatabase.getAllUsers();
        return res.status(200).json(rows);
    } catch(err){
        return res.status(400).json({
            error: true,
            message: "Error getting Data"
        });
    }
});

app.post('/sign-up', async (req, res) => {
    try{
        mysqlDatabase.addUser(req.body);
        console.log(req.body.username);
        user = await mysqlDatabase.getUser(req.body.username);
        return res.status(201).json(user[0]);
    } catch(err){
        return res.status(400).json({
            error: err,
            message: "Error sign up"
        });
    }
});

app.delete('/delete-user-account', (req, res) => {
    try {
        mysqlDatabase.removeUser(req.body.username);
        return res.status(200).json({
            error: false,
            message: "Successfully deleted user"
        });
    } catch (err) {
        return res.status(400).json({
            error: err,
            message: "Could not delete the account"
        });
    }
});

app.put('/reset-password', async (req, res) => {
    try{
        mysqlDatabase.resetPass(req.body);
        user = await mysqlDatabase.getUser(req.body.username);
        return res.status(200).json(user[0]);
    } catch(err){
        console.log('Error updating data: ', err);
        return res.status(400).json({
            error: true,
            message: "Could not update password"
        });
    }
});

app.listen(PORT, async ()=>{
    console.log(`Server running on: ${HOST}:${PORT}`);
});