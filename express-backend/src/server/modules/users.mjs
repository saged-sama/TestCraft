export default function users(app, database){
    const addUser = 'call adduser(?, ?, ?, ?)';
    const authenticate = 'select authenticate(?, ?) as auth';
    const usernameavailable = 'select count(username) as cnt from user where username = ?';

    // sign up new user
    app.put("/sign-up", async (req, res) => {
        try {
            const user = req.body;
            await database.connection.promise().execute(addUser, [user.username, user.password, user.email, user.phone]);
            return res.status(200).json({
                message: "sign-up successful"
            });
        } catch (err) {
            console.error('Error signing up: ', err);
            return res.status(500).json({
                error: "sign-up unsuccessful"
            });
        }
    });

    app.post("/available-username", async (req, res) => {
        try {
            const { username } = req.body;
            const [rows, _] = await database.connection.promise().query(usernameavailable, [username]);
            const cnt = rows[0]['cnt'];
            return res.status(200).json({
                cnt: cnt
            });
        } catch (err) {
            return res.status(400).json({
                error: "Could not check availability"
            });
        }
    });

    // login to existing id
    app.post("/log-in", async (req, res) => {
        try {
            const user = req.body;
            const [rows, _] = await database.connection.promise().query(authenticate, [user.username, user.password]);

            let jsonRes = rows[0]['auth'];
            if (jsonRes === "0") {
                return res.status(401).json({
                    error: "Invalid credentials"
                });
            }
            jsonRes = await JSON.parse(jsonRes);
            return res.status(200).json(jsonRes);
        } catch (err) {
            console.error("Could not authenticate: ", err);
            return res.status(500).json({
                error: "Could not authenticate"
            });
        }
    });

    // app.post("/log-out", async (req, res) => {
    //     try{
    //         const user = req.body;
    //     } catch(err){
    //         console.error("Could not log out: ", err);
    //         return res.status(400).json({
    //             error: "Could not logout"
    //         });
    //     }
    // });
}