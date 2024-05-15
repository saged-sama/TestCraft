import user from "../objects/user.mjs";

export default function tests(app, database){

    app.get("/get-test-problems", async(req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            // const isAuthorized = await user(userID, authToken, database).isAuthorized();
            // if (!isAuthorized) {
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }
            const { testID } = req.query;
            // console.log(req.query);

            const [rows, _] = await database.connection.promise().query("select p.id, p.subj, p.topics, p.probDesc as question from testQuestions t join problem p on t.problemid = p.id where t.testid = ?", [testID]);
            // console.log(rows);
            return res.status(200).json({
                problems: rows
            });
        }catch(err){
            console.error("Error getting test info: ", err);
        }
    })

    app.get("/get-test-info", async(req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            // const isAuthorized = await user(userID, authToken, database).isAuthorized();
            // if (!isAuthorized) {
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }
            const { testID } = req.query;
            // console.log(req.query);

            const [rows, _] = await database.connection.promise().query("select * from test where id = ?", [testID]);
            // console.log(rows);
            return res.status(200).json({
                testInfo: rows[0]
            });
        }catch(err){
            console.error("Error getting test info: ", err);
        }
    })

    app.get("/get-tests", async(req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            // const isAuthorized = await user(userID, authToken, database).isAuthorized();
            // if (!isAuthorized) {
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }
            const {channelID, groupID} = req.query;
            console.log(channelID, groupID);
            // console.log(testProblems);
            let rows = [];
            let dummy;
            if(groupID === "0"){
                [rows, dummy] = await database.connection.promise().query("select * from test where channelID = ? and groupID is null order by creationTime desc", [channelID]);
            }
            else{
                [rows, dummy] = await database.connection.promise().query("select * from test where channelID = ? and groupID = ? order by creationTime desc", [channelID, groupID]);
            }
            return res.status(200).json({
                tests: rows
            })
        } catch(err){
            console.log("Could not create new test: ", err);
            return res.status(500).json({
                message: ""
            })
        }
    })
    
    app.post("/add-new-test", async(req, res) => {
        try {
            const { userID, authToken } = req.cookies;
            // const isAuthorized = await user(userID, authToken, database).isAuthorized();
            // if (!isAuthorized) {
            //     return res.status(401).json({
            //         error: "Unauthorized action"
            //     });
            // }
            const {channelID, groupID, newExam, testProblems} = req.body;
            // console.log(testProblems);
            let id = "";
            if(groupID !== "0"){
                const [rows, _] = await database.connection.promise().query("select addtestfunc(?, ?, ?, ?, ?, ?, ?, ?, ?) as id",
            [newExam.title, newExam.subj, newExam.topics, newExam.startTime, newExam.endTime, newExam.totalMarks, userID, channelID, groupID]);
                id = rows[0]["id"];
            }
            else{
                const [rows, _] = await database.connection.promise().query("select addtestfunc(?, ?, ?, ?, ?, ?, ?, ?, null) as id",
            [newExam.title, newExam.subj, newExam.topics, newExam.startTime, newExam.endTime, newExam.totalMarks, userID, channelID]);
                id = rows[0]["id"]
            }
            testProblems.forEach(async(problem) => {
                await database.connection.promise().execute("insert into testQuestions(testid, problemid) values(?, ?)", [id, problem.problemID])
            });
        } catch(err){
            console.log("Could not create new test: ", err);
            return res.status(500).json({
                message: ""
            })
        }
    });
}