const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

class mysqlDB{
    constructor () {
        this.dbConfig = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        };
        this.connection = mysql.createConnection(this.dbConfig);
        if(this.connection){
            console.log('Successful connection created!!');
        }
    }

    async init(){

    }

    async getAllUsers(){
        
    }

    async close(){
        await this.connection.end();
    }
}

module.exports = mysqlDB;