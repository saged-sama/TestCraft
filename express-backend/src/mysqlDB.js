const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

class mysqlDB {
    constructor() {
        try{
            this.dbConfig = {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            };
            this.connection = mysql.createConnection(this.dbConfig);
            this.connection.connect((err) => {
                if (err) {
                    console.error('Error connecting to database: ' + err.stack);
                    return;
                }
                console.log('Successfully connected to database: ' + this.connection.threadId);
            });


            // Define all the relevant sql queries in variables
            this.ADDUSERPROCEDURE = 'CALL adduser(?, ?, ?, ?, ?, ?, ?, ?)';
            this.GETUSERPROCEDURE = 'CALL getuser(?)';
            this.GETALLUSERSPROCEDURE = 'CALL getallusers()';
            this.DELETEUSERPROCEDURE = 'CALL deleteuser(?)';
            this.UPDATEPASSPROCEDURE = 'CALL updatepass(?, ?)';
            this.UPDATENAMEPROCEDURE = 'CALL updatename(?, ?, ?)';
            this.UPDATEBIOPROCEDURE = 'CALL updatebio(?, ?)';
            this.UPDATEPROPICPROCEDURE = 'CALL updateprofilepicture(?, ?)';
        } catch(err){
            if(err){
                console.error('Error in mysqlDB construction: ', err);
            }
            throw err;
        }
    }

    async init() {
        // Initialize any setup if needed
    }

    async addUser(user) {
        try{
            const newUser = [user.username, user.password, user.email, user.type, user.first_name, user.last_name, user.bio, user.profile_picture];
            console.log(newUser);
            const ret = new Promise((resolve, reject)=>{
                this.connection.query(this.ADDUSERPROCEDURE, newUser, (err, results, fields) => {
                    if (err) {
                        console.error('Error adding user to db: ', err);
                        reject(err);
                        return;
                    } else {
                        console.log('Successfully Added User: ', results.affectedRows);
                        resolve(results.affectedRows);
                        return;
                    }
                });
            });
            return ret;
        } catch(err){
            console.error('Error addUser: ', err);
            return 0;
        }
    }

    async getAllUsers() { 
        try{
            const ret = await new Promise((resolve, reject) => {
                this.connection.query(this.GETALLUSERSPROCEDURE, [], (err, results, fields) => {
                    if (err) {
                        console.log('Error getting user info: ', err);
                        reject(err);
                        return;
                    }
                    if (results.length === 0) {
                        console.log('User not found');
                        resolve(null);
                    }
                    resolve(results);
                    return;
                });
            });
            return ret;
        } catch(err){
            console.error('Error getAllUsers: ', err);
            return [];
        }
    }

    async getUser(username) {
        try{
            const ret = await new Promise((resolve, reject) => {
                this.connection.query(this.GETUSERPROCEDURE, [username], (err, results, fields) => {
                    if (err) {
                        console.log('Error getting user info: ', err);
                        reject(err);
                        return;
                    }
                    if (results.length === 0) {
                        console.log('User not found');
                        resolve(null);
                    }
                    resolve(results[0]);
                    return;
                });
            });
            return ret;
        } catch(err){
            console.error('Error getUser: ', err);
            return [];
        }
    }

    async resetPass(user){
        try{
            this.connection.query(this.UPDATEPASSPROCEDURE, [user.username, user.password], (err, results, fields) => {
                if(err){
                    console.error('Error updating password: ', err);
                    return;
                }
                console.log('Successfully updated password');
            });
        } catch(err){
            console.error('Error restPass: ', err);
            return;
        }
    }

    async updateName(user){
        try{
            this.connection.query(this.UPDATENAMEPROCEDURE, [user.username, user.first_name, user.last_name], (err, results, fields) => {
                if(err){
                    console.error('Error updating names: ', err);
                    return;
                }
                console.log('Successfully updated names');
            });
        } catch(err){
            console.error('Error updateName: ', err);
            return;
        }
    }

    async updateBio(user){
        try{
            this.connection.query(this.UPDATEBIOPROCEDURE, [user.username, user.bio], (err, results, fields) => {
                if(err){
                    console.error('Error updating bio: ', err);
                    return;
                }
                console.log('Successfully updated bio');
            });
        } catch(err){
            console.error('Error updateBio: ', err);
            return;
        }
    }

    async updateProPic(user){
        try{
            this.connection.query(this.UPDATEPROPICPROCEDURE, [user.username, user.profile_picture], (err, results, fields) => {
                if(err){
                    console.error('Error updating profile picture: ', err);
                    return;
                }
                console.log('Successfully updated profile picture');
            });
        } catch(err){
            console.error('Error updateProPic: ', err);
            return;
        }
    }

    async removeUser(username){
        try{
            this.connection.query(this.DELETEUSERPROCEDURE, [username], (err, results, fields) => {
                if(err){
                    console.error('Error deleting user: ', err);
                }
                else{
                    console.log('Successfully deleted user');
                }
            });
        } catch(err){
            console.error('Error removeUser: ', err);
        }
    }

    async close() {
        try{
            await this.connection.end();
        } catch(err){
            console.error('Error closing mysqlDB: ', err);
        }
    }
}

module.exports = mysqlDB;
