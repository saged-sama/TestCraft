const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

class mysqlDB {
    constructor() {
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
    }

    async init() {
        // Initialize any setup if needed
    }

    async addUser(user) {
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
    }

    async getAllUsers() { 
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
    }

    async getUser(username) {
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
                resolve(results);
                return;
            });
        });
        return ret;
    }

    async resetPass(user){
        this.connection.query(this.UPDATEPASSPROCEDURE, [user.username, user.password], (err, results, fields) => {
            if(err){
                console.error('Error updating password: ', err);
                return;
            }
            console.log('Successfully updated password');
        });
    }

    async updateName(user){
        this.connection.query(this.UPDATENAMEPROCEDURE, [user.username, user.first_name, user.last_name], (err, results, fields) => {
            if(err){
                console.error('Error updating names: ', err);
                return;
            }
            console.log('Successfully updated names');
        });
    }

    async updateBio(user){
        this.connection.query(this.UPDATEBIOPROCEDURE, [user.username, user.bio], (err, results, fields) => {
            if(err){
                console.error('Error updating bio: ', err);
                return;
            }
            console.log('Successfully updated bio');
        });
    }

    async updateProPic(user){
        this.connection.query(this.UPDATEPROPICPROCEDURE, [user.username, user.profile_picture], (err, results, fields) => {
            if(err){
                console.error('Error updating profile picture: ', err);
                return;
            }
            console.log('Successfully updated profile picture');
        });
    }

    async removeUser(username){
        this.connection.query(this.DELETEUSERPROCEDURE, [username], (err, results, fields) => {
            if(err){
                console.error('Error deleting user: ', err);
                // return results.affectedRows();
            }
            else{
                console.log('Successfully deleted user');
                // return results.affectedRows();
            }
        });
    }

    async close() {
        await this.connection.end();
    }
}

module.exports = mysqlDB;
