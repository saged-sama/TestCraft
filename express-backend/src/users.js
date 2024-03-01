const mysqlDB = require('./mysqlDB');

class users{
    constructor(app){
        this.mysqlDatabase = new mysqlDB();
        app.get('/user-pass', async (req, res) => {
            try{
                const rows = await this.mysqlDatabase.getAllUsers();
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
                const ret = this.mysqlDatabase.addUser(req.body);
                return res.status(201).json({
                    error: false,
                    data: ret
                });
            } catch(err){
                return res.status(400).json({
                    error: err,
                    message: "Error sign up"
                });
            }
        });

        app.delete('/delete-user-account', (req, res) => {
            try {
                this.mysqlDatabase.removeUser(req.body.username);
                return res.status(200).json({
                    error: false,
                    message: "Successful deletion"
                });
            } catch (err) {
                return res.status(400).json({
                    error: true,
                    message: "Could not delete the account"
                });
            }
        });

        app.put('/reset-password', async (req, res) => {
            try{
                this.mysqlDatabase.resetPass(req.body);
                const user = await this.mysqlDatabase.getUser(req.body.username);
                return res.status(200).json(user[0]);
            } catch(err){
                console.log('Error updating data: ', err);
                return res.status(400).json({
                    error: true,
                    message: "Could not update password"
                });
            }
        });

        app.put('/update-name', async (req, res) => {
            try{
                this.mysqlDatabase.updateName(req.body);
                const user = await this.mysqlDatabase.getUser(req.body.username);
                return res.status(200).json(user[0]);
            } catch(err){
                console.log('Error updating data: ', err);
                return res.status(400).json({
                    error: true,
                    message: "Could not update password"
                });
            }
        });

        app.put('/update-bio', async (req, res) => {
            try{
                this.mysqlDatabase.updateBio(req.body);
                const user = await this.mysqlDatabase.getUser(req.body.username);
                return res.status(200).json(user[0]);
            } catch(err){
                console.log('Error updating data: ', err);
                return res.status(400).json({
                    error: true,
                    message: "Could not update password"
                });
            }
        });


        app.put('/update-pro-pic', async (req, res) => {
            try{
                // const filepath = downloadfile(req.body.filepath)
                const filepath = "../res/";
                this.mysqlDatabase.updateProPic(req.body.username, filepath);
                const user = await this.mysqlDatabase.getUser(req.body.username);
                return res.status(200).json(user[0]);
            } catch(err){
                console.log('Error updating data: ', err);
                return res.status(400).json({
                    error: true,
                    message: "Could not update password"
                });
            }
        });
    }
}

module.exports = users;