import mysql from "mysql2";

export default class database {
    constructor() {
        try{
            this.dbConfig = {
                // host: import.meta.env.DB_HOST,
                // user: import.meta.env.DB_USER,
                // password: import.meta.env.DB_PASSWORD,
                // database: import.meta.env.DB_DATABASE
                host: "172.29.176.1",
                user: "amaterasu",
                password: "amaterasu",
                database: "testcraft"
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
