const { json } = require('body-parser');
const database = require('./database');

class users{
    constructor(app){
        this.database = new database();
        this.adduser = 'call adduser(?, ?, ?, ?)';
        this.authenticate = 'select authenticate(?, ?)';

        // sign up new user
        app.post("/sign-up", async (req, res) => {
            try{
                const user = req.body;
                const response = await this.database.connection.promise().execute(this.adduser, [user.username, user.password, user.email, user.phone]);
                // console.log("adduser procedure signup successful", response);
                // console.log(fields);
                return res.status(200).json({
                    message: "sign-up successful"
                });
            } catch(err){
                console.error('Error signing up: ', err);
                return res.status(500).json({
                    message: "sign-up unsuccessful",
                    error: err
                });
            }
        });

        // login to existing id
        app.post("/log-in", async (req, res) => {   
            try{
                const user = req.body;
                const [rows, fields] = await this.database.connection.promise().query(this.authenticate, [user.username, user.password]);
                // console.log(rows);
                // console.log(`authenticate(\'${user.username}\', \'${user.password}\')`);
                let jsonres = rows[0][`authenticate(\'${user.username}\', \'${user.password}\')`];
                if(jsonres == "0"){
                    return res.status(401).json({
                        message: "Invalid credentials"
                    });
                }
                jsonres = JSON.parse(jsonres);
                // console.log(jsonres);
                return res.status(200).json(jsonres);
            } catch(err){
                console.error("Error. Could not authenticate: ", err);
                return res.status(500).json({
                    error: err
                });
            }
        });
    }

    close(){
        this.database.close();
        console.log("connection closed!!");
    }
}

module.exports = users;