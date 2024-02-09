const sql = require('sqlite3')
const path = require('path')

class userDB{
    constructor(Path){
        const dbPath = path.resolve(__dirname, Path);
        this.Path = Path;

        this.INSERT = 'INSERT INTO users (username, password, role) VALUES(?, ?, ?)';
        this.CREATE = `CREATE TABLE IF NOT EXISTS users(
            username TEXT PRIMARY KEY,
            password TEXT,
            role INT
        )`;
        this.SELECTALL = 'SELECT * FROM users';
        this.GETBYUSERNAME = 'SELECT * FROM users WHERE username = ?';
        this.DELETEWHERE = 'DELETE FROM users WHERE username = ?';
        this.UPDATEPASS = 'UPDATE users SET password = ? WHERE username = ?';

        this.db = new sql.Database(dbPath, (err) => {
            if(err){
                console.error(`Error creating Databse from path: ${Path}  Err: ${err}`);
                return;
            }
            console.log(`Database Created Successfully...path: ${dbPath}`);
        });

        this.db.run(this.CREATE, (err) => {
            if(err){
                console.error(`Error creating table: users    Error: ${err}`);
                return;
            }
            console.error(`Successfully created table: users`);
        });
    }

    addUser(userData){
        this.db.run(this.INSERT, [userData.username, userData.password, userData.role], (err) => {
            if(err){
                console.error(`Error inserting ${userData}\nError: `, err);
                return;
            }
            console.log(`Successfully added new User: `, userData);
        });
    }

    getAllUsers = () => {
        return new Promise((resolve, reject) => {
            this.db.all(this.SELECTALL, [], (err, rows) => {
                if(err){
                    console.error('Error fetching all user Data: ', err);
                    reject(err)
                    return;
                }
                console.log('Successfully fetched all user Data');
                // console.log(rows);
                resolve(rows);
            });
        });
    }

    getUser = (username) => {
        return new Promise((resolve, reject) => {
            this.db.all(this.GETBYUSERNAME, [username], (err, rows) => {
                if(err){
                    console.error('Error fetching user Data: ', err);
                    reject(err);
                    return;
                }
                console.log('Successfully retrieved user data');
                resolve(rows);
            });
        });
    }

    resetPass(user){
        this.db.run(this.UPDATEPASS, [user.password, user.username], (err) => {
            if(err){
                console.error('Error updating password: ', err);
                return;
            }
            console.log('Successfully updated password');
        });
    }

    removeUser(username){
        this.db.run(this.DELETEWHERE, [username], (err) => {
            if(err){
                console.log('Error deleting user: ', err);
                return;
            }
            console.log('Successfully deleted user');
        });
    }
}

module.exports = userDB;