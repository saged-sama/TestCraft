import mysql from "mysql2";

export default function database() {
    let connection;
    try {
        const dbConfig = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        };
        connection = mysql.createConnection(dbConfig);
        connection.connect((err) => {
            if (err) {
                console.error('Error connecting to database: ' + err.stack);
                return;
            }
            console.log('Successfully connected to database: ' + connection.threadId);
        });


        // Define all the relevant sql queries in variables

    } catch (err) {
        if (err) {
            console.error('Error in database construction: ', err);
        }
        throw err;
    }
    return {connection};
}