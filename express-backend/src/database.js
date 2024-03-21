const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

class database {
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
            
        } catch(err){
            if(err){
                console.error('Error in database construction: ', err);
            }
            throw err;
        }
    }

    async close() {
        try{
            await this.connection.end();
        } catch(err){
            console.error('Error closing database: ', err);
        }
    }
}

module.exports = database;
