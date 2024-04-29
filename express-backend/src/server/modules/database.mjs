import mysql from "mysql2";

export default function database() {
    let connection;
    try {
        const dbConfig = {
            // host: import.meta.env.DB_HOST,
            // user: import.meta.env.DB_USER,
            // password: import.meta.env.DB_PASSWORD,
            // database: import.meta.env.DB_DATABASE
            host: "172.29.176.1",
            user: "amaterasu",
            password: "amaterasu",
            database: "testcraft"
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