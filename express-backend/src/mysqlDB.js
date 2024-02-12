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

        this.ADDUSERPROCEDURE = 'CALL adduser(?, ?, ?, ?, ?, ?, ?, ?)';
        this.GETUSERPROCEDURE = 'CALL getuser(?)';
        this.GETALLUSERSPROCEDURE = 'CALL getallusers()';
    }

    async init() {
        // Initialize any setup if needed
    }

    addUser(user) {
        const newUser = [user.username, user.password, user.email, user.type, user.first_name, user.last_name, user.bio, user.profile_picture];
        console.log(newUser);
        this.connection.query(this.ADDUSERPROCEDURE, newUser, (err, results, fields) => {
            if (err) {
                console.error('Error adding user to db: ', err);
            } else {
                console.log('Successfully Added User: ', fields);
                return results.affectedRows;
            }
        });
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

    async close() {
        await this.connection.end();
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
}

module.exports = mysqlDB;
