export default function subjects(app, database) {
    app.get("/get-subjects", async(_, res) => {
        try{
            const [rows, _] = await database.connection.promise().query("select * from subjects");
            const subjects = rows;
            return res.status(200).json({
                subjects
            });
        }catch(err){
            console.log("Could not get subjects: ", err);
            return res.status(500).json({
                message: "Could not get subjects"
            });
        }
    });
    app.get("/get-subject-id-by-name", async(req, res) => {
        try{
            const {title} = req.query;
            const [rows, _] = await database.connection.promise().query("select id as subjectID from subjects where title = ?", [title]);
            const subjectID = rows[0]["subjectID"];
            return res.status(200).json({
                subjectID
            });
        }catch(err){
            console.log("Could not get subject ID: ", err);
            return res.status(500).json({
                message: "Could not get subject ID"
            });
        }
    });
}